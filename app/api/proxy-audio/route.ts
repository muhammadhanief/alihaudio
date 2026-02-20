import { NextRequest, NextResponse } from "next/server";

// Endpoint untuk handle Proxy Google TTS via SoundOfText
// Ini 100% berjalan di Backend untuk menembus CORS Browser

export async function POST(req: NextRequest) {
    try {
        const { text, lang } = await req.json();

        // 1. Request pembuatan suara ke SoundOfText
        let createRes;
        try {
            createRes = await fetch("https://api.soundoftext.com/sounds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    engine: "google",
                    data: { text, voice: lang }
                }),
                signal: AbortSignal.timeout(5000) // Batasi 5 detik
            });
        } catch (fetchErr: any) {
            console.error("FIREWALL DETECTED (CREATE):", fetchErr.message);
            return NextResponse.json({
                error: "FIREWALL SERVER: Server cPanel BPS menutup akses ke SoundOfText. Harap gunakan Mode Laki-laki atau Upload Manual.",
                details: fetchErr.message
            }, { status: 503 }); // 503 Service Unavailable
        }

        if (!createRes.ok) {
            const errText = await createRes.text();
            return NextResponse.json({ error: `Server Suara Menolak: ${errText}` }, { status: createRes.status });
        }

        const { id } = await createRes.json();

        // 2. Polling status sampai selesai
        let attempts = 0;
        let location = "";

        while (attempts < 5) {
            await new Promise(r => setTimeout(r, 1000));
            try {
                const checkRes = await fetch(`https://api.soundoftext.com/sounds/${id}`, { signal: AbortSignal.timeout(3000) });
                const data = await checkRes.json();
                if (data.status === "Done") {
                    location = data.location;
                    break;
                }
            } catch (pollErr: any) {
                console.warn("Polling interrupted by firewall/network:", pollErr.message);
            }
            attempts++;
        }

        if (!location) throw new Error("Server suara terlalu lambat atau koneksi terputus.");

        return NextResponse.json({ success: true, audioUrl: location });

    } catch (error: any) {
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
