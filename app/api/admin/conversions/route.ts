import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = (() => {
            try {
                const decoded = Buffer.from(session.value, 'base64').toString();
                return JSON.parse(decoded);
            } catch (e) {
                try {
                    return JSON.parse(decodeURIComponent(session.value));
                } catch (e2) {
                    return JSON.parse(session.value);
                }
            }
        })();

        const nipp = user.nipp || user.username || user.nip;

        // Fetch latest role from DB to be sure
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [nipp]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const role = rows[0].role;

        if (role !== 'admin' && role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const [conversions]: any = await pool.query(`
            SELECT c.*, u.nama as user_nama, u.satker as user_satker 
            FROM conversions c
            LEFT JOIN users u ON c.user_nipp = u.nipp
            ORDER BY c.created_at DESC
        `);

        const response = NextResponse.json({ conversions });

        // Anti-cache headers for cPanel/LiteSpeed
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error: any) {
        console.error("Fetch All Conversions Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
