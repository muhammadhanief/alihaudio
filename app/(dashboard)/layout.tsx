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
        fetch(getApiUrl("/api/auth/session")).then(async res => {
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
            {/* Sidebar with dynamic width handled inside */}
            <Sidebar user={user} />

            {/* Main Content Area */}
            <main className="flex-1 ml-[auto] transition-all duration-500 overflow-x-hidden p-4 md:p-6" style={{
                paddingLeft: "calc(15rem + 1.5rem)"
            }}>
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Adjustment for collapsed state - needs better logic but for now: */}
            <style jsx global>{`
                aside.w-16 + main {
                    padding-left: calc(4rem + 1.5rem) !important;
                }
            `}</style>
        </div>
    );
}
