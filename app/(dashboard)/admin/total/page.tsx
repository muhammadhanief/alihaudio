"use client";

import { useState, useEffect } from "react";
import { Globe, PlayCircle, Download, Clock, Code, Check, Search, ArrowUpDown, ArrowUp, ArrowDown, Eye, Trash2 } from "lucide-react";
import { getApiUrl, getAssetUrl } from "@/lib/utils";
import ConversionDetailModal from "@/app/components/ConversionDetailModal";
import { useSortAndFilter } from "@/app/hooks/useSortAndFilter";
import { SortIcon as BaseSortIcon } from "@/app/components/SortIcon";

export default function AllConversionsPage() {
    const [conversions, setConversions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copyId, setCopyId] = useState<number | null>(null);
    const [selectedConversion, setSelectedConversion] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const { search, setSearch, sortConfig, toggleSort, filteredAndSorted } = useSortAndFilter(
        conversions,
        ['judul', 'text_input', 'user_nama', 'user_satker']
    );

    const SortIcon = ({ columnKey }: { columnKey: string }) => <BaseSortIcon columnKey={columnKey} sortConfig={sortConfig as any} />;

    const fetchConversions = () => {
        fetch(getApiUrl(`/api/admin/conversions?t=${Date.now()}`), { headers: { 'Cache-Control': 'no-cache' } }).then(async res => {
            if (res.ok) {
                const data = await res.json();
                setConversions(data.conversions);
                setLoading(false);
            }
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        fetch(getApiUrl(`/api/auth/session?_t=${Date.now()}`)).then(async res => {
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        });

        fetchConversions();

        window.addEventListener('focus', fetchConversions);
        return () => window.removeEventListener('focus', fetchConversions);
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus konversi ini beserta audionya?")) return;
        try {
            const res = await fetch(getApiUrl(`/api/admin/conversions/${id}`), { method: "DELETE" });
            const data = await res.json();
            if (res.ok && data.success) {
                setConversions(prev => prev.filter(c => c.id !== id));
            } else {
                alert(`Gagal menghapus: ${data.error || 'Terjadi kesalahan server'}`);
            }
        } catch (e) {
            console.error("Delete Error:", e);
            alert("Terjadi kesalahan sistem saat menghubungi server.");
        }
    };

    const handleCopyHtml = (c: any) => {
        const fullUrl = `${window.location.origin}${getAssetUrl(c.audio_path)}`;
        const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;
        navigator.clipboard.writeText(htmlSnippet).then(() => {
            setCopyId(c.id);
            setTimeout(() => setCopyId(null), 2000);
        });
    };

    return (
        <div className="space-y-5 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-4xl font-bold text-orange-950 tracking-tight uppercase">Alih Audio Total</h1>
                <p className="text-orange-900/50 text-xs font-semibold uppercase tracking-widest mt-1">
                    Rekap seluruh konversi sistem
                    {conversions.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-[9px] font-bold">
                            {conversions.length} data
                        </span>
                    )}
                </p>
            </div>

            {/* Searchbar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Cari judul, teks, nama pengguna, atau satker..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 rounded-2xl border border-orange-200/60 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all"
                    style={{ color: '#1c0a00', backgroundColor: 'rgba(255,255,255,0.85)' }}
                />
                {search && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-orange-900/40 uppercase tracking-wider">
                        {filteredAndSorted.length} hasil
                    </span>
                )}
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
                    <Globe className="h-12 w-12" />
                    <p className="text-sm font-semibold uppercase tracking-widest">
                        {search ? 'Tidak ada hasil ditemukan' : 'Belum ada data konversi'}
                    </p>
                </div>
            )}

            {!loading && filteredAndSorted.length > 0 && (
                <>
                    {/* ──────────────────────────────────────────
                        MOBILE: Card Layout (< md)
                    ────────────────────────────────────────── */}
                    <div className="md:hidden space-y-3">
                        {filteredAndSorted.map((c) => (
                            <div key={c.id} className="glass rounded-[24px] p-4 border border-orange-200/50 shadow-sm space-y-3">
                                {/* Judul */}
                                {c.judul && (
                                    <span className="text-sm font-semibold text-orange-950 leading-snug block">{c.judul}</span>
                                )}

                                {/* Pengguna + badge mode */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm flex-shrink-0 overflow-hidden">
                                            {c.user_foto_url ? (
                                                <img src={c.user_foto_url} alt={c.user_nama} className="w-full h-full object-cover" />
                                            ) : (
                                                c.user_nama?.charAt(0) ?? '?'
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[11px] font-semibold text-orange-950 truncate">{c.user_nama}</div>
                                            <div className="text-[9px] font-medium text-orange-900/40 truncate">{c.user_satker}</div>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-wider flex-shrink-0 ${c.mode === 'puter' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-700'}`}>
                                        {c.mode === 'puter' ? '♂ Laki-laki' : '♀ Perempuan'}
                                    </span>
                                </div>

                                {/* Waktu */}
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-orange-900/40 uppercase" suppressHydrationWarning>
                                    <Clock className="h-3 w-3" />
                                    {new Date(c.created_at).toLocaleString('id-ID')}
                                </div>

                                {/* Teks input */}
                                {c.text_input && (
                                    <p className="text-xs text-orange-900/60 font-medium italic leading-relaxed line-clamp-2 px-1 border-l-2 border-orange-200">
                                        "{c.text_input}"
                                    </p>
                                )}

                                {/* Action buttons */}
                                {c.audio_path && (
                                    <div className="flex items-center gap-2 pt-1">
                                        <button
                                            onClick={() => {
                                                setSelectedConversion(c);
                                                setIsDetailOpen(true);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all duration-100 text-[10px] font-semibold uppercase tracking-wider shadow-sm"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleCopyHtml(c)}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${copyId === c.id
                                                ? 'bg-green-500 text-white'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                        >
                                            {copyId === c.id ? <Check className="h-3.5 w-3.5" /> : <Code className="h-3.5 w-3.5" />}
                                            {copyId === c.id ? 'Tersalin!' : 'Salin HTML'}
                                        </button>
                                        <a
                                            href={getAssetUrl(c.audio_path)}
                                            target="_blank"
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            <PlayCircle className="h-3.5 w-3.5" />
                                            Putar
                                        </a>
                                        <a
                                            href={getAssetUrl(c.audio_path)}
                                            download
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition-all text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            Unduh
                                        </a>
                                        {user?.role === 'superadmin' && (
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider"
                                                title="Hapus"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ──────────────────────────────────────────
                        DESKTOP: Table Layout (>= md)
                    ────────────────────────────────────────── */}
                    <div className="hidden md:block glass rounded-[40px] overflow-hidden shadow-xl border border-orange-200/50">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-orange-500/5 border-b border-orange-100">
                                        <th
                                            className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                            onClick={() => toggleSort('created_at')}
                                        >
                                            Waktu <SortIcon columnKey="created_at" />
                                        </th>
                                        <th
                                            className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                            onClick={() => toggleSort('user_nama')}
                                        >
                                            Nama <SortIcon columnKey="user_nama" />
                                        </th>
                                        <th
                                            className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                            onClick={() => toggleSort('judul')}
                                        >
                                            Judul <SortIcon columnKey="judul" />
                                        </th>
                                        <th
                                            className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                            onClick={() => toggleSort('mode')}
                                        >
                                            Mode <SortIcon columnKey="mode" />
                                        </th>
                                        <th
                                            className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest cursor-pointer group hover:bg-orange-500/10 transition-colors"
                                            onClick={() => toggleSort('text_input')}
                                        >
                                            Teks <SortIcon columnKey="text_input" />
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSorted.map((c) => (
                                        <tr key={c.id} className="border-b border-orange-50/50 hover:bg-orange-50/30 transition-colors">
                                            <td className="px-6 py-4 text-[11px] font-medium text-orange-950" suppressHydrationWarning>
                                                {new Date(c.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-[11px] flex-shrink-0 overflow-hidden">
                                                        {c.user_foto_url ? (
                                                            <img src={c.user_foto_url} alt={c.user_nama} className="w-full h-full object-cover" />
                                                        ) : (
                                                            c.user_nama?.charAt(0) ?? '?'
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-[11px] font-semibold text-orange-950 truncate">{c.user_nama}</span>
                                                        <span className="text-[9px] font-medium text-orange-900/40 truncate">{c.user_satker}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-orange-950 max-w-[180px] truncate">
                                                    {c.judul || <span className="text-orange-900/20 italic font-medium text-xs">—</span>}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[9px] font-semibold uppercase tracking-wider ${c.mode === 'puter' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'}`}>
                                                    {c.mode === 'puter' ? '♂ Laki-laki' : '♀ Perempuan'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[11px] text-orange-900/70 truncate max-w-[200px]">{c.text_input}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedConversion(c);
                                                            setIsDetailOpen(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all duration-100 shadow-lg shadow-orange-500/20"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
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
                                                            {user?.role === 'superadmin' && (
                                                                <button
                                                                    onClick={() => handleDelete(c.id)}
                                                                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                                    title="Hapus Konversi"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
            {/* Detail Modal */}
            <ConversionDetailModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                conversion={selectedConversion}
                isAdminMode={true}
            />
        </div>
    );
}
