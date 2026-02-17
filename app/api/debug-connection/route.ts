import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Testing connection to google.com...");
        const res = await fetch("https://www.google.com", { signal: AbortSignal.timeout(3000) });
        return NextResponse.json({
            status: "SUCCESS",
            message: "Server memiliki akses internet",
            httpCode: res.status
        });
    } catch (e: any) {
        return NextResponse.json({
            status: "FAILED",
            message: "Server DIBLOKIR/Tidak ada akses internet luar",
            errorName: e.name,
            errorMessage: e.message
        }, { status: 200 }); // Tetap return 200 supaya bisa dibaca di browser
    }
}
