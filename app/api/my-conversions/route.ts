import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const nipp = user.nipp;

        const [rows]: any = await pool.query(
            "SELECT * FROM conversions WHERE user_nipp = ? ORDER BY created_at DESC",
            [nipp]
        );

        return NextResponse.json({ conversions: rows });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
