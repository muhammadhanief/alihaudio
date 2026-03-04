import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        let { filename } = await params;

        // 🛡️ SECURITY: Anti Path Traversal
        // 1. Ambil hanya nama file saja, buang semua path (seperti ../ atau /)
        filename = path.basename(filename);

        // 2. Cegah karakter null dan traversal tersembunyi
        if (filename.includes('\0') || filename.includes('..')) {
            return new Response("Invalid filename", { status: 400 });
        }

        // Lokasi file di folder public/uploads/audio
        const filePath = path.join(process.cwd(), "public", "uploads", "audio", filename);

        try {
            const stat = await fs.stat(filePath);
            const fileSize = stat.size;
            const range = req.headers.get("range");

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = (end - start) + 1;

                const fileBuffer = await fs.readFile(filePath);
                const chunk = fileBuffer.subarray(start, end + 1);

                return new Response(chunk, {
                    status: 206,
                    headers: {
                        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunksize.toString(),
                        "Content-Type": "audio/mpeg",
                        "Cache-Control": "public, max-age=31536000, immutable",
                    },
                });
            } else {
                const fileBuffer = await fs.readFile(filePath);
                return new Response(fileBuffer, {
                    headers: {
                        "Content-Length": fileSize.toString(),
                        "Accept-Ranges": "bytes",
                        "Content-Type": "audio/mpeg",
                        "Cache-Control": "public, max-age=31536000, immutable",
                    },
                });
            }
        } catch (e) {
            console.error("File not found via API:", filePath);
            return new Response("Audio file not found or path inaccessible", { status: 404 });
        }
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}
