import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth_session");

    if (!session) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const userData = JSON.parse(session.value);

        // Fetch current role from DB to ensure session stays updated
        const pool = (await import("@/lib/db")).default;
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [userData.nipp]);

        if (rows.length > 0) {
            userData.role = rows[0].role;
        }

        return NextResponse.json({ authenticated: true, user: userData });
    } catch (e) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
