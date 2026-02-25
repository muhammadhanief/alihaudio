import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json({ error: "Conversion ID is required" }, { status: 400 });
        }

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

        // Fetch latest role from DB to accurately check for superadmin
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [nipp]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const role = rows[0].role;

        // ONLY superadmins are allowed to delete conversions
        if (role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden: Only superadmin can delete conversions" }, { status: 403 });
        }

        // Fetch conversion to get audio_path
        const [conversions]: any = await pool.query("SELECT audio_path FROM conversions WHERE id = ?", [id]);

        if (conversions.length === 0) {
            return NextResponse.json({ error: "Conversion not found" }, { status: 404 });
        }

        const audioPath = conversions[0].audio_path;

        // Delete from database
        await pool.query("DELETE FROM conversions WHERE id = ?", [id]);

        // Attempt to delete audio file if exists
        if (audioPath) {
            try {
                // audio_path format: /uploads/audio/...
                const localPath = path.join(process.cwd(), "public", audioPath);
                await fs.unlink(localPath);
            } catch (fsError) {
                console.warn("Failed to delete local audio file (already deleted or missing):", fsError);
                // Do not throw; DB delete was successful.
            }
        }

        return NextResponse.json({ success: true, message: "Conversion deleted successfully" });
    } catch (error: any) {
        console.error("Delete Conversion Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
