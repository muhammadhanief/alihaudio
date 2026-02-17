"use client";

import { useState, useEffect } from "react";
import { Mic2, PlayCircle, Download, Clock, Code, Check } from "lucide-react";
import { getApiUrl, getAssetUrl } from "@/lib/utils";

export default function MyConversionsPage() {
    const [conversions, setConversions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copyId, setCopyId] = useState<number | null>(null);

    useEffect(() => {
        fetch(getApiUrl("/api/my-conversions"))
            .then(res => res.json())
            .then(data => {
                setConversions(data.conversions);
                setLoading(false);
            });
    }, []);

    const handleCopyHtml = (c: any) => {
        const fullUrl = `${window.location.origin}${getAssetUrl(c.audio_path)}`;
        const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;

        navigator.clipboard.writeText(htmlSnippet).then(() => {
            setCopyId(c.id);
            setTimeout(() => setCopyId(null), 2000);
        });
    };

    if (loading) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-orange-950 tracking-tighter uppercase">Alih Audio Saya</h1>
                <p className="text-orange-900/50 text-xs font-bold uppercase tracking-widest mt-1">Daftar riwayat konversi Anda</p>
            </div>

            {/* List */}
            <div className="glass rounded-[40px] overflow-hidden shadow-xl border border-orange-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-orange-500/5 border-b border-orange-100">
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Waktu</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Mode</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest">Teks Input</th>
                                <th className="px-6 py-4 text-[10px] font-black text-orange-900/40 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conversions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-orange-900/20">
                                            <Mic2 className="h-12 w-12" />
                                            <p className="text-sm font-black uppercase tracking-widest">Belum ada riwayat konversi</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                conversions.map((c) => (
                                    <tr key={c.id} className="border-b border-orange-50/50 hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-orange-100/50 text-orange-600">
                                                    <Clock className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-black text-orange-950">
                                                        {new Date(c.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-orange-900/40 uppercase">
                                                        {new Date(c.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${c.mode === 'puter' ? 'bg-orange-600 text-white' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {c.mode === 'puter' ? '♂ Laki-laki' : '♀ Perempuan'}
                                                </span>
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase">{c.lang}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[11px] text-orange-900/70 truncate max-w-sm font-medium italic">
                                                "{c.text_input}"
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {c.audio_path && (
                                                    <>
                                                        <button
                                                            onClick={() => handleCopyHtml(c)}
                                                            className={`p-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${copyId === c.id
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                                            title="Salin untuk Backend"
                                                        >
                                                            {copyId === c.id ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                                                        </button>
                                                        <a
                                                            href={getAssetUrl(c.audio_path)}
                                                            target="_blank"
                                                            className="p-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                                                            title="Buka Audio"
                                                        >
                                                            <PlayCircle className="h-4 w-4" />
                                                        </a>
                                                        <a
                                                            href={getAssetUrl(c.audio_path)}
                                                            download
                                                            className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
                                                            title="Unduh MP3"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
