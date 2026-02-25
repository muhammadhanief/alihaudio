"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { getApiUrl } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();

    const [guestAccess, setGuestAccess] = useState<boolean>(true);

    useEffect(() => {
        // If already logged in, go to converter
        fetch(getApiUrl("/api/auth/session")).then(res => {
            if (res.ok) router.push("/converter");
        });

        // Check if guest mode is allowed
        fetch(getApiUrl("/api/settings")).then(async res => {
            if (res.ok) {
                const data = await res.json();
                if (data.success) setGuestAccess(data.settings.guest_access);
            }
        }).catch(() => { });
    }, [router]);

    return (
        <div className="relative min-h-screen selection:bg-orange-500/30">
            <div className="bg-mesh" />

            <div className="relative z-10 flex flex-col items-center justify-center p-4 min-h-screen">
                <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center">
                    <button
                        onClick={() => router.push("/")}
                        className="mb-12 flex items-center gap-2 group transition-all"
                    >
                        <div className="p-2 rounded-xl bg-orange-600 shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-zinc-900 uppercase">Alih Audio</span>
                    </button>

                    <LoginForm onSuccess={() => router.push("/converter")} />

                    {guestAccess && (
                        <button
                            onClick={() => router.push("/guest")}
                            className="mt-6 text-sm font-semibold text-orange-900/60 hover:text-orange-600 transition-colors uppercase tracking-widest outline-none"
                        >
                            Tidak memiliki akun SSO? Masuk sebagai tamu
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
