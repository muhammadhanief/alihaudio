import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const { text, mode, lang, provider, audioData } = await req.json();

        // Get user from session cookie
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = JSON.parse(session.value);
        const user_nipp = user.nipp || user.username || user.nip;

        if (!user_nipp) {
            return NextResponse.json({ error: "Invalid user session" }, { status: 401 });
        }

        // --- SAVE MP3 FILE ---
        let audioPath = null;
        if (audioData) {
            const fileName = `voice-${user_nipp}-${Date.now()}.mp3`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "audio");
            const filePath = path.join(uploadDir, fileName);

            // Ensure directory exists
            await fs.mkdir(uploadDir, { recursive: true });

            // Remove base64 prefix if exists (e.g., data:audio/mpeg;base64,)
            const base64Data = audioData.replace(/^data:audio\/\w+;base64,/, "");
            await fs.writeFile(filePath, Buffer.from(base64Data, "base64"));

            audioPath = `/uploads/audio/${fileName}`;
        }

        // Save to database
        await pool.query(
            `INSERT INTO conversions (user_nipp, text_input, mode, lang, provider, audio_path) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_nipp, text, mode, lang, provider, audioPath]
        );

        return NextResponse.json({
            success: true,
            message: "Conversion saved",
            audioPath
        });
    } catch (error: any) {
        console.error("Save Conversion Error:", error);
        return NextResponse.json(
            { error: "Internal server error while saving conversion" },
            { status: 500 }
        );
    }
}
