import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [user.nipp]);

        if (rows.length === 0 || rows[0].role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const [users]: any = await pool.query("SELECT nipp, nama, satker, role, last_login FROM users ORDER BY last_login DESC");
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { targetNipp, newRole } = await req.json();
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = JSON.parse(session.value);
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [user.nipp]);

        if (rows.length === 0 || rows[0].role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (targetNipp === user.nipp && newRole !== 'superadmin') {
            return NextResponse.json({ error: "Cannot demote yourself" }, { status: 400 });
        }

        await pool.query("UPDATE users SET role = ? WHERE nipp = ?", [newRole, targetNipp]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
