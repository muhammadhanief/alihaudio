"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { getApiUrl } from "@/lib/utils";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Dummy user for guest mode
    const [user] = useState({
        nama: "Tamu",
        role: "guest",
        nipp: "GUEST"
    });

    const router = useRouter();

    useEffect(() => {
        fetch(getApiUrl("/api/settings")).then(async res => {
            if (res.ok) {
                const data = await res.json();
                if (data.success && !data.settings.guest_access) {
                    router.push("/");
                }
            }
        }).catch(() => { });
    }, [router]);

    return (
        <div className="min-h-screen bg-[#fffaf5] flex">
            <Sidebar user={user} />

            {/* Main Content Area */}
            {/* Mobile: full width (sidebar adalah overlay) */}
            {/* Desktop: geser kanan sesuai lebar sidebar (w-60 = 15rem) */}
            <main className="flex-1 w-full md:pl-60 transition-all duration-200 overflow-x-hidden">
                <div className="max-w-7xl mx-auto p-4 pt-16 md:pt-6 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
