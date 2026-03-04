import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // 🛡️ SECURITY: Validasi Body Request (Cegah crash 500)
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { username, password } = body;

        // 🛡️ SECURITY: Input Validation (Allow List Strategy)
        // Username BPS biasanya NIP (angka) atau alphanumeric. Kita batasi karakter khusus.
        const usernameRegex = /^[a-zA-Z0-9._-]+$/;
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                { error: "Username contains invalid characters" },
                { status: 400 }
            );
        }

        // Batasi panjang input untuk mencegah DoS/Buffer Overflow attempts
        if (username.length > 50 || password.length > 100) {
            return NextResponse.json(
                { error: "Input too long" },
                { status: 400 }
            );
        }

        // --- BACKDOOR PENGUJIAN TIK ---
        let isTestingBypass = false;
        let dummyData: any = null;

        const testAccounts: Record<string, any> = {
            "uji_user": { role: "user", nipp: "UJI01", nama: "Tester User", satker: "Tim Penguji", email: "uji1@bps.go.id" },
            "uji_admin": { role: "admin", nipp: "UJI02", nama: "Tester Admin", satker: "Tim Penguji", email: "uji2@bps.go.id" },
            "uji_superadmin": { role: "superadmin", nipp: "UJI03", nama: "Tester Superadmin", satker: "Tim Penguji", email: "uji3@bps.go.id" }
        };

        if (testAccounts[username] && password === "Bps12345!") {
            isTestingBypass = true;
            dummyData = { detail: "Success", data: testAccounts[username] };
        }
        // ---------------------------------

        let data: any;

        if (isTestingBypass) {
            data = dummyData;
        } else {
            const apiKey = process.env.BPS_API_KEY;
            const apiUrl = process.env.BPS_API_URL;

            if (!apiKey || !apiUrl) {
                // 🛡️ SECURITY: Jangan ungkap detail konfigurasi ke client
                console.error("[AUTH ERROR] BPS API configuration missing in environment variables");
                return NextResponse.json(
                    { error: "Authentication service unavailable. Please try again later." },
                    { status: 503 }
                );
            }

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "Origin": "http://localhost"
                },
                body: JSON.stringify({ username, password }),
            });

            data = await response.json();

            if (!response.ok) {
                // 🛡️ SECURITY: Kembalikan pesan generik, log detail di server
                console.error(`[AUTH ERROR] BPS API responded with ${response.status}:`, data);
                return NextResponse.json(
                    { error: "Invalid username or password." },
                    { status: 401 }
                );
            }
        }

        // --- SAVE TO DATABASE ---
        // Merge username into data.data for easier identification
        const sessionData = {
            ...data.data,
            username: data.data.username || username,
            nipp: data.data.nipp || data.data.nip || username
        };

        try {
            const pool = (await import("@/lib/db")).default;

            await pool.query(
                `INSERT INTO users (nipp, nip_lama, nama, foto_url, satker, kd_satker, jabatan, email, role, last_login) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                 ON DUPLICATE KEY UPDATE 
                 nip_lama = VALUES(nip_lama),
                 nama = VALUES(nama), 
                 foto_url = VALUES(foto_url), 
                 satker = VALUES(satker),
                 kd_satker = VALUES(kd_satker),
                 jabatan = VALUES(jabatan),
                 email = VALUES(email),
                 last_login = CURRENT_TIMESTAMP`,
                [
                    sessionData.nipp,
                    sessionData.nip_lama || null,
                    sessionData.nama,
                    sessionData.foto_url || null,
                    sessionData.satker || null,
                    sessionData.kd_satker || null,
                    sessionData.jabatan || null,
                    sessionData.email || null,
                    isTestingBypass ? sessionData.role : 'user'
                ]
            );
            // Fetch the ACTUAL role from our DB (since BPS API doesn't have it)
            const [userRows]: any = await pool.query(
                "SELECT role FROM users WHERE nipp = ?",
                [sessionData.nipp]
            );

            if (userRows.length > 0) {
                sessionData.role = userRows[0].role || 'user';
            } else {
                sessionData.role = 'user';
            }
        } catch (dbError) {
            console.error("Database User Sync Error:", dbError);
            sessionData.role = 'user'; // Fallback
        }
        // -------------------------

        // Success - Create a session cookie (SIMPLE JSON FORMAT)
        const res = NextResponse.json({
            success: true,
            user: sessionData,
            message: "Login successful"
        });

        // Set a basic cookie for persistence
        res.cookies.set("auth_session", JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Pakai true HANYA di hosting (Production)
            sameSite: "lax",
            path: "/alihaudio",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return res;
    } catch (error: any) {
        // 🛡️ SECURITY: Log detail error di server, tapi jangan expose ke client
        console.error("[LOGIN ERROR] Unexpected error:", error?.message || error);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}
