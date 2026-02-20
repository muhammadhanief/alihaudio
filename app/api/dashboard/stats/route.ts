import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const nipp = user.nipp || user.username || user.nip;
        if (!nipp) {
            return NextResponse.json({ error: "Session invalid: NIPP not found" }, { status: 401 });
        }

        // Total conversions by user
        const [totalRows]: any = await pool.query("SELECT COUNT(*) as count FROM conversions WHERE user_nipp = ?", [nipp]);

        // Mode distribution
        const [modeRows]: any = await pool.query("SELECT mode, COUNT(*) as count FROM conversions WHERE user_nipp = ? GROUP BY mode", [nipp]);

        // Weekly activity (last 7 days)
        const [weeklyRows]: any = await pool.query(`
            SELECT DATE(created_at) as date, COUNT(*) as count 
            FROM conversions 
            WHERE user_nipp = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        `, [nipp]);
        const response = NextResponse.json({
            stats: {
                total: totalRows[0]?.count || 0,
                modes: modeRows || [],
                weekly: weeklyRows || []
            }
        });

        // Anti-cache headers
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error: any) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
    }
}
