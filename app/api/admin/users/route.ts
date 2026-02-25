import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = (() => {
            try {
                const decoded = Buffer.from(session.value, 'base64').toString();
                return JSON.parse(decoded);
            } catch (e) {
                try {
                    return JSON.parse(decodeURIComponent(session.value));
                } catch (e2) {
                    return JSON.parse(session.value);
                }
            }
        })();

        const nipp = user.nipp || user.username || user.nip;
        const [rows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [nipp]);

        if (rows.length === 0 || rows[0].role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const [users]: any = await pool.query("SELECT nipp, nip_lama, nama, foto_url, satker, kd_satker, role, last_login FROM users ORDER BY last_login DESC");

        const response = NextResponse.json({ users });

        // Anti-cache headers for cPanel/LiteSpeed/Nginx
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    } catch (error) {
        console.error("GET Users Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { targetNipp, newRole } = await req.json();
        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = (() => {
            try {
                const decoded = Buffer.from(session.value, 'base64').toString();
                return JSON.parse(decoded);
            } catch (e) {
                try {
                    return JSON.parse(decodeURIComponent(session.value));
                } catch (e2) {
                    return JSON.parse(session.value);
                }
            }
        })();

        const currentUserNipp = user.nipp || user.username || user.nip;
        const [currentUserRows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [currentUserNipp]);

        if (currentUserRows.length === 0 || currentUserRows[0].role !== 'superadmin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const [targetUserRows]: any = await pool.query("SELECT role FROM users WHERE nipp = ?", [targetNipp]);
        if (targetUserRows.length === 0) {
            return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
        }

        const currentUserRole = currentUserRows[0].role;
        const targetUserRole = targetUserRows[0].role;

        // Validasi tidak bisa saling mengintervensi scope role yang sama (kecuali dirinya sendiri yang mana di-handle di pengecekan selanjutnya)
        if (targetNipp !== currentUserNipp && targetUserRole === currentUserRole) {
            return NextResponse.json({ error: "Anda tidak diberikan hak untuk mengubah peran pengguna yang memiliki tingkatan role setara." }, { status: 403 });
        }

        if (targetNipp === currentUserNipp && newRole !== 'superadmin') {
            return NextResponse.json({ error: "Tidak dapat menurunkan hak akses (demote) akun Anda sendiri" }, { status: 400 });
        }

        await pool.query("UPDATE users SET role = ? WHERE nipp = ?", [newRole, targetNipp]);

        const response = NextResponse.json({ success: true });

        // Ensure no caching for this action result
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

        return response;
    } catch (error) {
        console.error("POST User Role Update Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
