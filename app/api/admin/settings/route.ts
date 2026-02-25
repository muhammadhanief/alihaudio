import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
    try {
        const { guest_access } = await req.json();

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

        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [nipp]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (rows[0].role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden: Only superadmin can access this" }, { status: 403 });
        }

        // Initialize table if it doesn't exist just in case
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                setting_key VARCHAR(50) PRIMARY KEY,
                setting_value VARCHAR(255) NOT NULL
            )
        `);

        // Update or insert guest_access
        const valueStr = guest_access ? 'true' : 'false';
        await pool.query(`
            INSERT INTO settings (setting_key, setting_value) 
            VALUES ('guest_access', ?)
            ON DUPLICATE KEY UPDATE setting_value = ?
        `, [valueStr, valueStr]);

        return NextResponse.json({ success: true, message: "Settings updated successfully" });
    } catch (error: any) {
        console.error("Update Settings Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
