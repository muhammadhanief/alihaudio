import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.BPS_API_KEY;
        const apiUrl = process.env.BPS_API_URL;

        if (!apiKey || !apiUrl) {
            console.error("Auth configuration missing");
            return NextResponse.json(
                { error: "Server authentication configuration missing" },
                { status: 500 }
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

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.detail || "Authentication failed" },
                { status: response.status }
            );
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
                `INSERT INTO users (nipp, nip_lama, nama, foto_url, satker, kd_satker, jabatan, email, last_login) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
                    sessionData.foto_url,
                    sessionData.satker,
                    sessionData.kd_satker || null,
                    sessionData.jabatan || null,
                    sessionData.email || null
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
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal server error during authentication" },
            { status: 500 }
        );
    }
}
