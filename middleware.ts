import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🛡️ GLOBAL SECURITY MIDDLEWARE
// Mencegah Path Traversal dan SQL Injection pada semua URL Parameter

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 🛡️ FIX: Big Redirect - Redirect bersih tanpa body (mencegah ZAP false positive)
    // Ketika route /guest/ diakses, alihkan ke /guest/converter dengan redirect HTTP murni
    if (pathname === '/guest' || pathname === '/guest/') {
        const url = request.nextUrl.clone();
        url.pathname = '/guest/converter';
        return NextResponse.redirect(url, { status: 301 });
    }

    const { searchParams } = request.nextUrl;

    // 1. Daftar Kata Kunci Berbahaya (SQL & Traversal)
    const forbiddenPatterns = [
        /\.\.\//,          // path traversal ../
        /randomblob\(/i,   // sqlite injection
        /sleep\(/i,        // mysql time-based
        /benchmark\(/i,    // mysql time-based
        /union.*select/i,  // sql injection
        /drop.*table/i,    // sql injection
        /--/,              // sql comments
        /\{\{.*\}\}/,      // template injection {{...}}
        /\$\{.*\}?/,       // JS template literal injection ${...}
        /<script/i,        // XSS attempt
    ];

    // 2. Cek semua Query Parameters
    for (const [key, value] of searchParams.entries()) {
        const isForbidden = forbiddenPatterns.some(pattern => pattern.test(value));

        if (isForbidden) {
            console.warn(`[SECURITY] Blocked suspicious request on param: ${key}=${value}`);
            return new NextResponse(
                JSON.stringify({ error: "Forbidden: Suspicious characters detected in URL parameters" }),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    return NextResponse.next();
}

// Hanya jalankan proxy pada rute API dan halaman dashboard/converter
export const config = {
    matcher: [
        '/api/:path*',
        '/admin/:path*',
        '/converter/:path*',
        '/my-conversions/:path*',
        '/guest/:path*'
    ],
};
