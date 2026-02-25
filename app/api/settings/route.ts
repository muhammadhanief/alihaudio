import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Auto-create settings table if it doesn't exist yet
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                setting_key VARCHAR(50) PRIMARY KEY,
                setting_value VARCHAR(255) NOT NULL
            )
        `);

        const [rows]: any = await pool.query("SELECT * FROM settings WHERE setting_key = 'guest_access'");

        let guestAccess = true;

        if (rows.length === 0) {
            // default to true
            await pool.query("INSERT INTO settings (setting_key, setting_value) VALUES ('guest_access', 'true')");
        } else {
            guestAccess = rows[0].setting_value === 'true';
        }

        const response = NextResponse.json({ success: true, settings: { guest_access: guestAccess } });

        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error: any) {
        console.error("Fetch Settings Error:", error);
        // Fallback robust response
        return NextResponse.json({ success: true, settings: { guest_access: true } });
    }
}
