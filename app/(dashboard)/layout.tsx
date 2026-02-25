"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { getApiUrl } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(getApiUrl(`/api/auth/session?_t=${Date.now()}`)).then(async res => {
            if (!res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                setUser(data.user);
                setLoading(false);
            }
        }).catch(() => {
            router.push("/login");
        });
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fffaf5]">
                <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
            </div>
        );
    }

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
