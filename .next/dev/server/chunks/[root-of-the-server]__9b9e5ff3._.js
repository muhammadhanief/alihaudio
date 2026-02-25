module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(req) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Username and password are required"
            }, {
                status: 400
            });
        }
        // --- BACKDOOR PENGUJIAN TIK ---
        let isTestingBypass = false;
        let dummyData = null;
        const testAccounts = {
            "uji_user": {
                role: "user",
                nipp: "UJI01",
                nama: "Tester User",
                satker: "Tim Penguji",
                email: "uji1@bps.go.id"
            },
            "uji_admin": {
                role: "admin",
                nipp: "UJI02",
                nama: "Tester Admin",
                satker: "Tim Penguji",
                email: "uji2@bps.go.id"
            },
            "uji_superadmin": {
                role: "superadmin",
                nipp: "UJI03",
                nama: "Tester Superadmin",
                satker: "Tim Penguji",
                email: "uji3@bps.go.id"
            }
        };
        if (testAccounts[username] && password === "Bps12345!") {
            isTestingBypass = true;
            dummyData = {
                detail: "Success",
                data: testAccounts[username]
            };
        }
        // ---------------------------------
        let data;
        if (isTestingBypass) {
            data = dummyData;
        } else {
            const apiKey = process.env.BPS_API_KEY;
            const apiUrl = process.env.BPS_API_URL;
            if (!apiKey || !apiUrl) {
                console.error("Auth configuration missing");
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Server authentication configuration missing"
                }, {
                    status: 500
                });
            }
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "Origin": "http://localhost"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            data = await response.json();
            if (!response.ok) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: data.detail || "Authentication failed"
                }, {
                    status: response.status
                });
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
            const pool = (await __turbopack_context__.A("[project]/lib/db.ts [app-route] (ecmascript, async loader)")).default;
            await pool.query(`INSERT INTO users (nipp, nip_lama, nama, foto_url, satker, kd_satker, jabatan, email, role, last_login) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                 ON DUPLICATE KEY UPDATE 
                 nip_lama = VALUES(nip_lama),
                 nama = VALUES(nama), 
                 foto_url = VALUES(foto_url), 
                 satker = VALUES(satker),
                 kd_satker = VALUES(kd_satker),
                 jabatan = VALUES(jabatan),
                 email = VALUES(email),
                 last_login = CURRENT_TIMESTAMP`, [
                sessionData.nipp,
                sessionData.nip_lama || null,
                sessionData.nama,
                sessionData.foto_url || null,
                sessionData.satker || null,
                sessionData.kd_satker || null,
                sessionData.jabatan || null,
                sessionData.email || null,
                isTestingBypass ? sessionData.role : 'user'
            ]);
            // Fetch the ACTUAL role from our DB (since BPS API doesn't have it)
            const [userRows] = await pool.query("SELECT role FROM users WHERE nipp = ?", [
                sessionData.nipp
            ]);
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
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            user: sessionData,
            message: "Login successful"
        });
        // Set a basic cookie for persistence
        res.cookies.set("auth_session", JSON.stringify(sessionData), {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            path: "/alihaudio",
            maxAge: 60 * 60 * 24
        });
        return res;
    } catch (error) {
        console.error("Login Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error during authentication"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9b9e5ff3._.js.map