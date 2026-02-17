import { NextRequest, NextResponse } from "next/server";

// Endpoint untuk handle Proxy Google TTS via SoundOfText
// Ini 100% berjalan di Backend untuk menembus CORS Browser

export async function POST(req: NextRequest) {
    try {
        const { text, lang } = await req.json();

        // 1. Request pembuatan suara ke SoundOfText
        const createRes = await fetch("https://api.soundoftext.com/sounds", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                engine: "google",
                data: { text, voice: lang }
            })
        });

        if (!createRes.ok) throw new Error("Gagal menghubungi server suara.");
        const { id } = await createRes.json();

        // 2. Polling status sampai selesai (maksimal 5 detik)
        let attempts = 0;
        let location = "";

        while (attempts < 5) {
            await new Promise(r => setTimeout(r, 1000));
            const checkRes = await fetch(`https://api.soundoftext.com/sounds/${id}`);
            const data = await checkRes.json();

            if (data.status === "Done") {
                location = data.location;
                break;
            }
            attempts++;
        }

        if (!location) throw new Error("Server suara terlalu lambat.");

        return NextResponse.json({ success: true, audioUrl: location });

    } catch (error: any) {
        console.error("Backend Proxy TTS Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) return new Response("URL missing", { status: 400 });

    try {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Response(blob, {
            headers: { "Content-Type": "audio/mpeg" }
        });
    } catch (e: any) {
        return new Response(e.message, { status: 500 });
    }
}
