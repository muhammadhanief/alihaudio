import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "No session found" }, { status: 401 });
        }

        let userData;
        try {
            userData = JSON.parse(session.value);
        } catch (e) {
            return NextResponse.json({ error: "Invalid session format" }, { status: 401 });
        }

        const nipp = userData.nipp || userData.username || userData.nip;

        // Fetch CURRENT role from DB to ensure UI is always in sync
        try {
            const pool = (await import("@/lib/db")).default;
            const [dbUser]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [nipp]);

            if (dbUser.length > 0 && dbUser[0].role !== userData.role) {
                userData.role = dbUser[0].role;

                // Update the cookie so other parts of the app (Server Components/Middleware)
                // will also see the updated role immediately.
                cookieStore.set("auth_session", JSON.stringify(userData), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/alihaudio",
                    maxAge: 60 * 60 * 24, // 24 hours
                });
            }
        } catch (dbErr) {
            console.error("Session Role Sync Error:", dbErr);
        }

        const response = NextResponse.json({
            authenticated: true,
            user: userData
        });

        // Anti-cache headers for cPanel/LiteSpeed
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error) {
        console.error("Session Check Error:", error);
        const errResponse = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        errResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
        return errResponse;
    }
}
