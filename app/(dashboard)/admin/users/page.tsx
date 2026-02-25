"use client";

import { useState, useEffect, useMemo } from "react";
import { Users, ShieldCheck, UserCog, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { getApiUrl } from "@/lib/utils";
import { useSortAndFilter } from "@/app/hooks/useSortAndFilter";
import { SortIcon as BaseSortIcon } from "@/app/components/SortIcon";
import toast from "react-hot-toast";

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filterSatker, setFilterSatker] = useState("");

    useEffect(() => {
        fetch(getApiUrl(`/api/auth/session?t=${Date.now()}`)).then(async res => {
            const data = await res.json();
            setCurrentUser(data.user);
            loadUsers();
        });
    }, []);

    const loadUsers = async () => {
        const res = await fetch(getApiUrl(`/api/admin/users?t=${Date.now()}`));
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
        if (res.ok) {
            toast.success("Berhasil mengubah role pengguna");
            loadUsers();
        } else {
            const data = await res.json();
            toast.error(data.error || "Gagal mengubah role pengguna");
            loadUsers(); // reload old data
        }
    };

    // Calculate unique satker for the dropdown
    const uniqueSatkers = useMemo(() => {
        const list = users.filter((u: any) => u.kd_satker).map((u: any) => ({ kd: u.kd_satker, nama: u.satker }));
        const unique = [];
        const map = new Map();
        for (const item of list) {
            if (!map.has(item.kd)) {
                map.set(item.kd, true);
                unique.push(item);
            }
        }
        return unique.sort((a, b) => a.kd.localeCompare(b.kd));
    }, [users]);

    // Sort and Filter Helper
    const { search: _search, setSearch: _setSearch, sortConfig, toggleSort, filteredAndSorted: baseFilteredAndSorted } = useSortAndFilter(users, ['nama', 'nipp', 'nip_lama', 'kd_satker', 'satker']);

    // We bind local search to the hook's setter to keep the UI input synchronous
    useEffect(() => {
        _setSearch(search);
    }, [search, _setSearch]);

    const SortIcon = ({ columnKey }: { columnKey: string }) => <BaseSortIcon columnKey={columnKey} sortConfig={sortConfig as any} />;

    // Derived State (Filtered & Sorted)
    const filteredAndSorted = useMemo(() => {
        let result = baseFilteredAndSorted;

        // Satker filter
        if (filterSatker) {
            result = result.filter(u => u.kd_satker === filterSatker);
        }

        return result;
    }, [baseFilteredAndSorted, filterSatker]);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-orange-950 tracking-tighter uppercase">Manajemen User</h1>
                <p className="text-orange-900/50 text-xs font-medium uppercase tracking-widest mt-1">Delegasi peran dan akses sistem ({users.length} Total)</p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Searchbar */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Cari nama, NIP, atau satker..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 rounded-2xl border border-orange-200/60 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all bg-white/80"
                        style={{ color: '#1c0a00' }}
                    />
                    {search && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-orange-900/40 uppercase tracking-wider">
                            {filteredAndSorted.length} hasil
                        </span>
                    )}
                </div>

                {/* Filter Satker */}
                <div className="relative w-full md:w-72 flex-shrink-0">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400 pointer-events-none" />
                    <select
                        value={filterSatker}
                        onChange={e => setFilterSatker(e.target.value)}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-orange-200/60 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all bg-white/80 appearance-none translate-y-0"
                        style={{ color: '#1c0a00' }}
                    >
                        <option value="">Semua Satuan Kerja</option>
                        {uniqueSatkers.map(s => (
                            <option key={s.kd} value={s.kd}>{s.kd}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="glass rounded-[32px] p-24 flex flex-col items-center justify-center gap-4 text-orange-600 border border-orange-200/50">
                    <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-[spin_0.8s_linear_infinite]"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-900/40 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        Memuat Data...
                    </p>
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredAndSorted.length === 0 && (
                <div className="glass rounded-[32px] p-16 flex flex-col items-center gap-4 text-orange-900/20 border border-orange-200/50">
                    <Users className="h-12 w-12" />
                    <p className="text-sm font-semibold uppercase tracking-widest">
                        Tidak ada pengguna ditemukan
                    </p>
                </div>
            )}

            {!loading && filteredAndSorted.length > 0 && (
                <>
                    {/* ──────────────────────────────────────────
                        MOBILE: Card Layout (< md)
                    ────────────────────────────────────────── */}
                    <div className="md:hidden space-y-3">
                        {filteredAndSorted.map((u) => (
                            <div key={u.nipp} className="glass rounded-[24px] p-4 border border-orange-200/50 shadow-sm space-y-3 flex flex-col">
                                <div className="flex items-center gap-3">
                                    {u.foto_url ? (
                                        <img src={u.foto_url} alt={u.nama} className="w-12 h-12 rounded-xl object-cover border border-orange-100 shadow-sm flex-shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg flex-shrink-0">
                                            {u.nama?.charAt(0) || '?'}
                                        </div>
                                    )}
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <span className="text-sm font-bold text-orange-950 leading-tight break-words whitespace-normal">{u.nama}</span>
                                            {u.role === 'superadmin' && <ShieldCheck className="h-4 w-4 text-purple-600 flex-shrink-0" />}
                                        </div>
                                        <span className="text-[10px] font-medium text-zinc-500 tracking-tight">{u.nipp}{u.nip_lama ? ` / ${u.nip_lama}` : ''}</span>
                                    </div>
                                </div>

                                <div className="text-[10px] font-medium text-orange-900/50 leading-snug">
                                    {u.kd_satker ? `[${u.kd_satker}] ${u.satker}` : u.satker}
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-semibold text-orange-900/30 uppercase tracking-widest">Login Terakhir</span>
                                        <span className="text-[10px] font-medium text-zinc-500" suppressHydrationWarning>
                                            {u.last_login ? new Date(u.last_login).toLocaleString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </span>
                                    </div>

                                    {u.nipp !== currentUser?.nipp ? (
                                        u.role === currentUser?.role ? (
                                            <span className="text-[10px] font-medium text-orange-600 italic opacity-50">Setingkat ({u.role})</span>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <UserCog className="h-3.5 w-3.5 text-orange-400" />
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleUpdateRole(u.nipp, e.target.value)}
                                                    className={`text-[9px] font-semibold border rounded-lg px-2 py-1 outline-none hover:border-orange-500 transition-colors cursor-pointer ${u.role === 'superadmin' ? 'bg-purple-100 border-purple-200 text-purple-700' :
                                                        u.role === 'admin' ? 'bg-blue-100 border-blue-200 text-blue-700' :
                                                            'bg-zinc-100 border-zinc-200 text-zinc-700'
                                                        }`}
                                                >
                                                    <option value="user">USER</option>
                                                    <option value="admin">ADMIN</option>
                                                    <option value="superadmin">SUPERADMIN</option>
                                                </select>
                                            </div>
                                        )
                                    ) : (
                                        <span className="text-[10px] font-medium text-orange-600 italic opacity-50">Akun Anda</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ──────────────────────────────────────────
                        DESKTOP: Table Layout (>= md)
                    ────────────────────────────────────────── */}
                    <div className="hidden md:block glass rounded-[40px] overflow-hidden shadow-xl border border-orange-200/50 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-orange-500/5 border-b border-orange-100">
                                    <th
                                        className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                        onClick={() => toggleSort('nama')}
                                    >
                                        Data Pengguna <SortIcon columnKey="nama" />
                                    </th>
                                    <th
                                        className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                        onClick={() => toggleSort('nipp')}
                                    >
                                        NIP / NIPP <SortIcon columnKey="nipp" />
                                    </th>
                                    <th
                                        className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                        onClick={() => toggleSort('role')}
                                    >
                                        Peran <SortIcon columnKey="role" />
                                    </th>
                                    <th
                                        className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                        onClick={() => toggleSort('last_login')}
                                    >
                                        Login Terakhir <SortIcon columnKey="last_login" />
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSorted.map((u) => (
                                    <tr key={u.nipp} className="border-b border-orange-50/50 hover:bg-orange-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {u.foto_url ? (
                                                    <img src={u.foto_url} alt={u.nama} className="w-10 h-10 rounded-xl object-cover border border-orange-100 shadow-sm flex-shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                                                        {u.nama?.charAt(0) || '?'}
                                                    </div>
                                                )}
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[11px] font-semibold text-orange-950 truncate">{u.nama}</span>
                                                    <span className="text-[9px] font-medium text-orange-900/40 tracking-tighter truncate max-w-[200px]" title={u.satker}>
                                                        {u.kd_satker ? `[${u.kd_satker}] ${u.satker}` : u.satker}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] font-medium text-zinc-500">
                                            {u.nipp}
                                            {u.nip_lama && <span className="block text-[9px] text-zinc-400 mt-0.5">{u.nip_lama}</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {u.role === 'superadmin' && <ShieldCheck className="h-4 w-4 text-purple-600" />}
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${u.role === 'superadmin' ? 'bg-purple-100 text-purple-600' :
                                                    u.role === 'admin' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-zinc-100 text-zinc-600'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] text-zinc-400" suppressHydrationWarning>
                                            {u.last_login ? new Date(u.last_login).toLocaleString('id-ID') : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.nipp !== currentUser?.nipp ? (
                                                u.role === currentUser?.role ? (
                                                    <span className="text-[10px] font-medium text-orange-600 italic opacity-50">Setingkat ({u.role})</span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <UserCog className="h-4 w-4 text-orange-400" />
                                                        <select
                                                            value={u.role}
                                                            onChange={(e) => handleUpdateRole(u.nipp, e.target.value)}
                                                            className="text-[10px] font-semibold border border-orange-200 rounded-lg px-3 py-1.5 outline-none hover:border-orange-500 transition-colors cursor-pointer"
                                                            style={{ color: '#1c0a00', backgroundColor: '#fff7ed' }}
                                                        >
                                                            <option value="user">USER</option>
                                                            <option value="admin">ADMIN</option>
                                                            <option value="superadmin">SUPERADMIN</option>
                                                        </select>
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-[10px] font-medium text-orange-600 italic opacity-50">Akun Anda</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
