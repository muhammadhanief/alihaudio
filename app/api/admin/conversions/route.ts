import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(session.value);

        // Fetch latest role from DB to be sure
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [user.nipp]);

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

        return NextResponse.json({ conversions });
    } catch (error: any) {
        console.error("Fetch All Conversions Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
