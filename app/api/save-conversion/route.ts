import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb",
        },
    },
};

export async function POST(req: Request) {
    try {
        // Gunakan formData() agar bisa bypass limit JSON di server
        const formData = await req.formData();
        const text = formData.get("text") as string;
        const judul = formData.get("judul") as string;
        const mode = formData.get("mode") as string;
        const lang = formData.get("lang") as string;
        const provider = formData.get("provider") as string;
        const audioFile = formData.get("audio") as File | null;

        // Get user from session cookie
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(session.value);
        const user_nipp = user.nipp || user.username || user.nip;

        if (!user_nipp) {
            return NextResponse.json({ error: "Invalid user session: NIPP missing" }, { status: 401 });
        }

        // --- SAVE MP3 FILE ---
        let audioPath = null;
        if (audioFile) {
            const fileName = `voice-${user_nipp}-${Date.now()}.mp3`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "audio");
            const filePath = path.join(uploadDir, fileName);

            // Ensure directory exists
            await fs.mkdir(uploadDir, { recursive: true });

            // Simpan langsung dari buffer file (lebih hemat memori)
            const buffer = Buffer.from(await audioFile.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            audioPath = `/uploads/audio/${fileName}`;
        }

        // Save to database (termasuk kolom judul)
        await pool.query(
            `INSERT INTO conversions (user_nipp, judul, text_input, mode, lang, provider, audio_path) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_nipp, judul || null, text, mode, lang, provider, audioPath]
        );

        return NextResponse.json({
            success: true,
            message: "Conversion saved",
            audioPath
        });
    } catch (error: any) {
        console.error("Save Conversion Error:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        );
    }
}
