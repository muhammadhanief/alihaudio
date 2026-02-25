"use client";

import { useState, useEffect } from "react";
import { Mic2, History, Languages, BarChart3, TrendingUp } from "lucide-react";
import { getApiUrl, getAssetUrl } from "@/lib/utils";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(getApiUrl(`/api/dashboard/stats?_t=${Date.now()}`), { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                setStats(data.stats);
                setLoading(false);
            });
    }, []);

    if (loading || !stats) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-orange-950 tracking-tighter uppercase">Beranda</h1>
                <p className="text-orange-900/50 text-xs font-medium uppercase tracking-widest mt-1">Ringkasan Aktivitas Anda</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-[32px] border border-orange-200/50 shadow-xl flex items-center justify-between group hover:scale-[1.02] transition-all">
                    <div>
                        <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest mb-1">Total Konversi</p>
                        <h3 className="text-4xl font-bold text-orange-950">{stats.total}</h3>
                    </div>
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                        <Mic2 className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="glass p-6 rounded-[32px] border border-orange-200/50 shadow-xl flex items-center justify-between group hover:scale-[1.02] transition-all">
                    <div>
                        <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest mb-1">Jenis Bahasa</p>
                        <h3 className="text-4xl font-bold text-orange-950">
                            {stats.modes?.length || 0}
                        </h3>
                    </div>
                    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Languages className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="glass p-6 rounded-[32px] border border-orange-200/50 shadow-xl flex items-center justify-between group hover:scale-[1.02] transition-all">
                    <div>
                        <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest mb-1">Aktivitas Mingguan</p>
                        <h3 className="text-4xl font-bold text-orange-950">
                            {stats.weekly?.reduce((acc: number, cur: any) => acc + cur.count, 0)}
                        </h3>
                    </div>
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
                        <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Visual Charts / More Info */}
            <div className="grid grid-cols-1  gap-8">
                {/* Mode Distribution */}
                <div className="glass p-7 rounded-[40px] border border-orange-200/50 shadow-xl">
                    <h4 className="text-sm font-bold text-orange-950 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-orange-600" /> Distribusi Suara
                    </h4>
                    <div className="space-y-4">
                        {stats.modes?.map((m: any) => (
                            <div key={m.mode} className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-tighter">
                                    <span className="text-zinc-600">{m.mode === 'puter' ? 'Laki-laki (AI)' : 'Perempuan (Google)'}</span>
                                    <span className="text-orange-600">{m.count} Kali</span>
                                </div>
                                <div className="h-2 w-full bg-orange-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-600"
                                        style={{ width: `${(m.count / stats.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Info / Tips */}
                {/* <div className="glass p-8 rounded-[40px] border border-orange-200/50 shadow-xl bg-gradient-to-br from-orange-600 to-orange-700 relative overflow-hidden">
                    <div className="relative z-10 text-white">
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">Tips Penggunaan</h4>
                        <p className="text-2xl font-bold tracking-tight leading-tight mb-6">
                            Gunakan mode "Laki-laki" untuk narasi berita yang lebih berwibawa.
                        </p>
                        <button
                            onClick={() => window.location.href = getAssetUrl('/converter')}
                            className="px-6 py-3 bg-white text-orange-600 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all"
                        >
                            Coba Sekarang
                        </button>
                    </div>
                    <Mic2 className="absolute bottom-[-20%] right-[-10%] h-48 w-48 text-white/10 -rotate-12" />
                </div> */}
            </div>
        </div>
    );
}
