"use client";

import { useState, useEffect } from "react";
import { Users, ShieldCheck, UserCog } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(getApiUrl("/api/auth/session")).then(async res => {
            const data = await res.json();
            setCurrentUser(data.user);
            loadUsers();
        });
    }, []);

    const loadUsers = async () => {
        const res = await fetch(getApiUrl("/api/admin/users"));
        if (res.ok) {
            const data = await res.json();
            setUsers(data.users);
            setLoading(false);
        }
    };

    const handleUpdateRole = async (targetNipp: string, newRole: string) => {
        const res = await fetch(getApiUrl("/api/admin/users"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetNipp, newRole })
        });
        if (res.ok) loadUsers();
    };

    if (loading) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-orange-950 tracking-tighter uppercase">Manajemen User</h1>
                <p className="text-orange-900/50 text-xs font-bold uppercase tracking-widest mt-1">Delegasi peran dan akses sistem</p>
            </div>

            <div className="glass rounded-[40px] overflow-hidden shadow-xl border border-orange-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-orange-500/5 border-b border-orange-100">
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Data Pengguna</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">NIP / NIPP</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Peran</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Login Terakhir</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.nipp} className="border-b border-orange-50/50 hover:bg-orange-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black">
                                                {u.nama.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black text-orange-950 uppercase">{u.nama}</span>
                                                <span className="text-[9px] font-bold text-orange-900/40 uppercase tracking-tighter">{u.satker}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-zinc-500">{u.nipp}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {u.role === 'superadmin' && <ShieldCheck className="h-4 w-4 text-purple-600" />}
                                            <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${u.role === 'superadmin' ? 'bg-purple-100 text-purple-600' :
                                                u.role === 'admin' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-zinc-100 text-zinc-600'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[11px] text-zinc-400">
                                        {u.last_login ? new Date(u.last_login).toLocaleString('id-ID') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.nipp !== currentUser?.nipp ? (
                                            <div className="flex items-center gap-2">
                                                <UserCog className="h-4 w-4 text-orange-400" />
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u.nipp, e.target.value)}
                                                    className="text-[10px] font-black bg-white border border-orange-200 rounded-lg px-3 py-1.5 outline-none hover:border-orange-500 transition-colors cursor-pointer"
                                                >
                                                    <option value="user">USER</option>
                                                    <option value="admin">ADMIN</option>
                                                    <option value="superadmin">SUPERADMIN</option>
                                                </select>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold text-orange-600 italic opacity-50">Akun Anda</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
