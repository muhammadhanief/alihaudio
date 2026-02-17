"use client";

import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Mic2,
    History,
    Globe,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import { getApiUrl } from "@/lib/utils";

interface SidebarProps {
    user: any;
}

export default function Sidebar({ user }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = async () => {
        await fetch(getApiUrl("/api/auth/logout"), { method: "POST" });
        router.push("/");
    };

    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    const isSuperAdmin = user?.role === 'superadmin';

    const menuItems = [
        { name: "Beranda", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Alih Audio", icon: Mic2, path: "/converter" },
        { name: "Alih Audio Saya", icon: History, path: "/my-conversions" },
    ];

    const adminItems = [
        { name: "Alih Audio Total", icon: Globe, path: "/admin/total" },
    ];

    const superAdminItems = [
        { name: "Manajemen User", icon: Users, path: "/admin/users" },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-orange-100 flex flex-col transition-all duration-500 z-[100] shadow-2xl ${isCollapsed ? 'w-16' : 'w-60'}`}
        >
            {/* Logo Area */}
            <div className="p-4 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-3 animate-fade-in">
                        <div className="p-2 rounded-xl bg-orange-600 shadow-lg shadow-orange-600/20">
                            <Mic2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-zinc-900 uppercase">Alih Audio</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="mx-auto p-2 rounded-xl bg-orange-600">
                        <Mic2 className="h-5 w-5 text-white" />
                    </div>
                )}
            </div>

            {/* User Profile Summary */}
            <div className={`px-4 py-6 border-b border-orange-50 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'flex-row items-start'} gap-3 ${isCollapsed ? '' : 'w-full'}`}>
                    {user?.foto_url ? (
                        <img src={user.foto_url} alt={user.nama} className="w-10 h-10 rounded-xl object-cover border border-orange-100 shadow-sm flex-shrink-0" />
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black flex-shrink-0">
                            {user?.nama?.charAt(0)}
                        </div>
                    )}
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-zinc-900 leading-tight uppercase break-words">{user?.nama}</span>
                            <span className="text-[11px] font-bold text-orange-600/70 uppercase tracking-tight mt-0.5">{user?.role}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* General Menu */}
                <div className="space-y-2">
                    {!isCollapsed && <label className="px-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Main Menu</label>}
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${pathname === item.path
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                : 'text-zinc-500 hover:bg-orange-50 hover:text-orange-600'}`}
                        >
                            <item.icon className={`h-5 w-5 ${pathname === item.path ? 'text-white' : 'group-hover:text-orange-600'}`} />
                            {!isCollapsed && <span className="text-sm font-black tracking-tight">{item.name}</span>}
                        </button>
                    ))}
                </div>

                {/* Admin Menu */}
                {isAdmin && (
                    <div className="space-y-2">
                        {!isCollapsed && <label className="px-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Admin Tools</label>}
                        {adminItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${pathname === item.path
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                    : 'text-zinc-500 hover:bg-orange-50 hover:text-orange-600'}`}
                            >
                                <item.icon className={`h-5 w-5 ${pathname === item.path ? 'text-white' : 'group-hover:text-orange-600'}`} />
                                {!isCollapsed && <span className="text-sm font-black tracking-tight">{item.name}</span>}
                            </button>
                        ))}
                    </div>
                )}

                {/* Superadmin Menu */}
                {isSuperAdmin && (
                    <div className="space-y-2">
                        {!isCollapsed && <label className="px-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">System</label>}
                        {superAdminItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${pathname === item.path
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                    : 'text-zinc-500 hover:bg-orange-50 hover:text-orange-600'}`}
                            >
                                <item.icon className={`h-5 w-5 ${pathname === item.path ? 'text-white' : 'group-hover:text-orange-600'}`} />
                                {!isCollapsed && <span className="text-sm font-black tracking-tight">{item.name}</span>}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-orange-50 space-y-2">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-orange-50 hover:text-orange-600 transition-all font-black text-xs uppercase"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5 mx-auto" /> : (
                        <>
                            <ChevronLeft className="h-5 w-5" />
                            <span>Sembunyikan</span>
                        </>
                    )}
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform mx-auto md:mx-0" />
                    {!isCollapsed && <span className="text-sm font-black tracking-tight uppercase">Keluar</span>}
                </button>
            </div>
        </aside>
    );
}
