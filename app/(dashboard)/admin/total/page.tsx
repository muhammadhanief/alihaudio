"use client";

import { useState, useEffect } from "react";
import { Globe, PlayCircle } from "lucide-react";
import { getApiUrl, getAssetUrl } from "@/lib/utils";

export default function AllConversionsPage() {
    const [conversions, setConversions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(getApiUrl("/api/admin/conversions")).then(async res => {
            if (res.ok) {
                const data = await res.json();
                setConversions(data.conversions);
                setLoading(false);
            }
        });
    }, []);

    if (loading) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-orange-950 tracking-tighter uppercase">Alih Audio Total</h1>
                <p className="text-orange-900/50 text-xs font-bold uppercase tracking-widest mt-1">Rekap seluruh konversi sistem</p>
            </div>

            <div className="glass rounded-[40px] overflow-hidden shadow-xl border border-orange-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-orange-500/5 border-b border-orange-100">
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Waktu</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Pengguna</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Mode</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Teks</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversions.map((c) => (
                                <tr key={c.id} className="border-b border-orange-50/50 hover:bg-orange-50/30 transition-colors">
                                    <td className="px-6 py-4 text-[11px] font-bold text-orange-950">
                                        {new Date(c.created_at).toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-orange-950 uppercase">{c.user_nama}</span>
                                            <span className="text-[9px] font-bold text-orange-900/40 uppercase">{c.user_satker}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${c.mode === 'puter' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                            {c.mode === 'puter' ? '♂ Laki-laki' : '♀ Perempuan'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-[11px] text-orange-900/70 truncate max-w-xs">{c.text_input}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {c.audio_path && (
                                            <a href={getAssetUrl(c.audio_path)} target="_blank" className="p-2 inline-block rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                                                <PlayCircle className="h-4 w-4" />
                                            </a>
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
