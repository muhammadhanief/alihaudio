"use client";

import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Mic2,
    History,
    Globe,
    Users,
    LogOut,
    Menu,
    X,
    UploadCloud,
    Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import { getApiUrl } from "@/lib/utils";

interface SidebarProps {
    user: any;
}

export default function Sidebar({ user }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    const isSuperAdmin = user?.role === 'superadmin';

    // Tutup sidebar saat route berubah (pada mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Tutup sidebar saat klik di luar (overlay)
    const handleOverlayClick = () => setIsOpen(false);

    const handleLogout = async () => {
        setIsOpen(false);
        if (user?.role === 'guest') {
            router.push("/");
            return;
        }
        await fetch(getApiUrl("/api/auth/logout"), { method: "POST" });
        router.push("/");
    };

    const navigate = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    const isGuest = user?.role === 'guest';

    const menuItems = isGuest
        ? [
            { name: "Alih Audio", icon: Mic2, path: "/guest/converter" },
            { name: "Alih Audio Saya", icon: History, path: "/guest/my-conversions" },
        ]
        : [
            { name: "Beranda", icon: LayoutDashboard, path: "/dashboard" },
            { name: "Alih Audio", icon: Mic2, path: "/converter" },
            { name: "Upload Manual", icon: UploadCloud, path: "/upload-audio" },
            { name: "Alih Audio Saya", icon: History, path: "/my-conversions" },
        ];

    const adminItems = [
        { name: "Alih Audio Total", icon: Globe, path: "/admin/total" },
    ];

    const superAdminItems = [
        { name: "Manajemen User", icon: Users, path: "/admin/users" },
        { name: "Pengaturan", icon: Settings, path: "/admin/settings" },
    ];

    const NavButton = ({ item }: { item: { name: string; icon: any; path: string } }) => {
        const active = pathname === item.path;
        return (
            <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${active
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                    : 'text-zinc-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
            >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
            </button>
        );
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Logo */}
            <div className="px-5 py-5 flex items-center gap-3 border-b border-orange-100">
                <div className="p-2 rounded-xl bg-orange-600 shadow-lg shadow-orange-600/20 flex-shrink-0">
                    <Mic2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900 uppercase">Alih Audio</span>
            </div>

            {/* User Profile */}
            <div className="px-5 py-4 border-b border-orange-50">
                <div className="flex items-center gap-3">
                    {user?.foto_url ? (
                        <img
                            src={user.foto_url}
                            alt={user.nama}
                            className="w-10 h-10 rounded-xl object-cover border border-orange-100 shadow-sm flex-shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-lg flex-shrink-0">
                            {user?.nama?.charAt(0)}
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-zinc-900 leading-tight break-words whitespace-normal">{user?.nama}</span>
                        <span className="text-[11px] font-medium text-orange-600/70 uppercase tracking-tight mt-0.5">{user?.role}</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 min-h-0">
                <div className="space-y-1">
                    <label className="px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Main Menu</label>
                    <div className="space-y-1 mt-1">
                        {menuItems.map((item) => <NavButton key={item.path} item={item} />)}
                    </div>
                </div>

                {isAdmin && (
                    <div className="space-y-1">
                        <label className="px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Admin Tools</label>
                        <div className="space-y-1 mt-1">
                            {adminItems.map((item) => <NavButton key={item.path} item={item} />)}
                        </div>
                    </div>
                )}

                {isSuperAdmin && (
                    <div className="space-y-1">
                        <label className="px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">System</label>
                        <div className="space-y-1 mt-1">
                            {superAdminItems.map((item) => <NavButton key={item.path} item={item} />)}
                        </div>
                    </div>
                )}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-orange-50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all group"
                >
                    <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold tracking-tight ">{isGuest ? 'Keluar Mode Tamu' : 'Logout'}</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ─── DESKTOP: Sidebar Permanen ─── */}
            <aside className="hidden md:flex fixed left-0 top-0 h-[100dvh] w-60 bg-white border-r border-orange-100 flex-col z-[100] shadow-xl">
                <SidebarContent />
            </aside>

            {/* ─── MOBILE: Hamburger Button ─── */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-[200] p-2.5 bg-white border border-orange-100 rounded-xl shadow-lg text-orange-600 hover:bg-orange-50 transition-all active:scale-95"
                aria-label="Buka menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* ─── MOBILE: Overlay backdrop ─── */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] animate-fade-in"
                    onClick={handleOverlayClick}
                />
            )}

            {/* ─── MOBILE: Slide-in Sidebar ─── */}
            <aside
                className={`md:hidden fixed left-0 top-0 h-[100dvh] w-72 bg-white z-[200] shadow-2xl transform transition-transform duration-200 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Tombol tutup */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all z-10"
                    aria-label="Tutup menu"
                >
                    <X className="h-5 w-5" />
                </button>

                <SidebarContent />
            </aside>
        </>
    );
}
