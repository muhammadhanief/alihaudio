import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { Agent } from "https";

export async function POST(req: Request) {
    try {
        // Here we default to ArdiNeural which is Male Indonesian
        const { text, model = "id-ID-ArdiNeural" } = await req.json();

        if (!text) {
            return NextResponse.json(
                { success: false, message: "Text is required" },
                { status: 400 }
            );
        }

        // Force IPv4 using a custom https agent (fixes cPanel WebSocket IPv6 routing issues)
        const agent = new Agent({ family: 4 });
        const tts = new MsEdgeTTS({ agent });
        await tts.setMetadata(model, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(text);

        const chunks: Buffer[] = [];
        await new Promise<void>((resolve, reject) => {
            audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            audioStream.on('error', reject);
            audioStream.on('close', resolve);
        });

        const audioBuffer = Buffer.concat(chunks);

        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
            },
        });
    } catch (error: any) {
        console.error("Error in Edge TTS route:", error);

        // Prepare a detailed error object to debug cPanel issues
        const errorDetail = {
            message: error?.message || "Internal Server Error",
            name: error?.name,
            stack: error?.stack,
            stringified: String(error)
        };

        return NextResponse.json(
            {
                success: false,
                message: errorDetail.message,
                detail: errorDetail
            },
            { status: 500 }
        );
    }
}
