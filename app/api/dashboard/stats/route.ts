import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const nipp = user.nipp;

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

        return NextResponse.json({
            stats: {
                total: totalRows[0].count,
                modes: modeRows,
                weekly: weeklyRows
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
