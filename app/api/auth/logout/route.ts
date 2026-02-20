import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true, message: "Logged out" });
    response.cookies.set("auth_session", "", {
        path: "/alihaudio",
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
}
