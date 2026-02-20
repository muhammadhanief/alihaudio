import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // PAKSA AMBIL DATA TERBARU (ANTI-CACHE)

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const nipp = user.nipp || user.username || user.nip;

        const [rows]: any = await pool.query(
            "SELECT * FROM conversions WHERE user_nipp = ? ORDER BY created_at DESC",
            [nipp]
        );

        const response = NextResponse.json({ conversions: rows });

        // Anti-cache headers
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
