import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        // Lokasi file di folder public/uploads/audio
        const filePath = path.join(process.cwd(), "public", "uploads", "audio", filename);

        try {
            const fileBuffer = await fs.readFile(filePath);

            return new Response(fileBuffer, {
                headers: {
                    "Content-Type": "audio/mpeg",
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        } catch (e) {
            console.error("File not found via API:", filePath);
            return new Response("Audio file not found or path inaccessible", { status: 404 });
        }
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}
