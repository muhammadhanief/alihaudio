import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [rows] = await pool.query(
            `SELECT id, judul, lang, mode, provider, text_input, audio_path, created_at 
             FROM conversions 
             WHERE user_nipp = 'GUEST' 
             ORDER BY created_at DESC 
             LIMIT 50`
        );

        return NextResponse.json({
            success: true,
            conversions: rows
        });
    } catch (error: any) {
        console.error("Fetch Guest Conversions Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
