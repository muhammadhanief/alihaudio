"use client";

import { useState } from "react";
import { Mic2, PlayCircle, Clock, Code, Check, X, Globe } from "lucide-react";
import { getAssetUrl } from "@/lib/utils";

interface ConversionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    conversion: any | null;
    isAdminMode?: boolean;
}

export default function ConversionDetailModal({
    isOpen,
    onClose,
    conversion,
    isAdminMode = false,
}: ConversionDetailModalProps) {
    const [copyId, setCopyId] = useState<number | null>(null);

    if (!isOpen || !conversion) return null;

    const handleCopyHtml = () => {
        const fullUrl = `${window.location.origin}${getAssetUrl(conversion.audio_path)}`;
        const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;
        navigator.clipboard.writeText(htmlSnippet).then(() => {
            setCopyId(conversion.id);
            setTimeout(() => setCopyId(null), 2000);
        });
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
            <div
                className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />
            <div className="relative glass-card bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-3xl animate-slide-up border border-orange-500/20 flex flex-col">
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-orange-100 flex items-center justify-between bg-orange-50/30">
                    <div>
                        <h3 className="text-xl font-bold text-orange-950 tracking-tight">Detail Alih Audio</h3>
                        <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-widest mt-0.5">
                            {isAdminMode ? 'Informasi Lengkap (Admin Mode)' : 'Informasi Lengkap Konversi'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-2xl bg-white border border-orange-100 text-orange-900/40 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-7 overflow-y-auto custom-scrollbar space-y-7 flex-1 bg-white" onClick={(e) => e.stopPropagation()}>
                    {/* Header Section: Title & Time */}
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-orange-100 pb-6">
                            <div className="flex-1 space-y-1">
                                <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-[0.2em]">Judul Konversi</p>
                                <h4 className="text-xl font-bold text-orange-950 leading-tight">
                                    {conversion.judul || 'Tanpa Judul'}
                                </h4>
                            </div>
                            <div className="text-left md:text-right shrink-0">
                                <p className="text-[10px] font-semibold text-orange-900/40 uppercase tracking-[0.2em] mb-1">
                                    {isAdminMode ? 'Waktu Pembuatan' : 'Waktu Dibuat'}
                                </p>
                                <p className="text-sm font-semibold text-orange-900 flex items-center md:justify-end gap-2" suppressHydrationWarning>
                                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                                    {isAdminMode ? (
                                        new Date(conversion.created_at).toLocaleString('id-ID', {
                                            day: '2-digit', month: 'long', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })
                                    ) : (
                                        <>
                                            {new Date(conversion.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            <span className="text-orange-900/30 font-medium whitespace-pre">
                                                {' '}{new Date(conversion.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Meta Info Bar & Audio Player */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {isAdminMode && (
                                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 overflow-hidden">
                                        {conversion.user_foto_url ? (
                                            <img
                                                src={conversion.user_foto_url}
                                                alt={conversion.user_nama}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg font-semibold">{conversion.user_nama?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-semibold text-orange-900/40 uppercase tracking-widest mb-0.5">Oleh Pengguna</p>
                                        <h5 className="text-sm font-bold text-orange-950 truncate">{conversion.user_nama}</h5>
                                        <p className="text-[10px] font-semibold text-orange-900/30 truncate uppercase">{conversion.user_satker}</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                {isAdminMode ? (
                                    <div className="col-span-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col justify-center">
                                        <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Mode & Bahasa</p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-bold text-zinc-900 uppercase">
                                                {conversion.mode === 'puter' ? '♂ Pria' : '♀ Wanita'}
                                            </span>
                                            <span className="text-zinc-300">•</span>
                                            <Globe className="h-3 w-3 text-zinc-400" />
                                            <span className="text-[10px] font-bold text-zinc-900 uppercase">{conversion.lang || 'Auto'}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100/50 flex flex-col justify-center">
                                            <p className="text-[9px] font-semibold text-orange-900/40 uppercase tracking-widest mb-1.5">Mode Suara</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${conversion.mode === 'puter' ? 'bg-orange-600' : 'bg-amber-500'}`}></span>
                                                <span className="text-xs font-bold text-orange-950 uppercase">{conversion.mode === 'puter' ? 'Pria (Onyx)' : 'Wanita (Cloud)'}</span>
                                            </div>
                                        </div>
                                        <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100 flex flex-col justify-center">
                                            <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Bahasa</p>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-3 w-3 text-zinc-400" />
                                                <span className="text-xs font-bold text-zinc-900 uppercase">{conversion.lang || 'Auto'}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className={`bg-orange-950/5 p-3 px-4 rounded-2xl border border-orange-950/5 flex items-center gap-4 ${isAdminMode ? 'md:col-span-2' : ''}`}>
                                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
                                    <PlayCircle className="h-5 w-5" />
                                </div>
                                <audio controls src={getAssetUrl(conversion.audio_path)} className="flex-1 h-8 opacity-90">
                                    Browser tidak mendukung audio.
                                </audio>
                            </div>
                        </div>
                    </div>

                    {/* Full Text Area */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <p className="text-[10px] font-semibold text-orange-950 uppercase tracking-[0.2em]">Naskah / Teks Sumber</p>
                            </div>
                            <span className="text-[9px] font-semibold text-orange-900/30 uppercase tracking-tighter">
                                Total: {conversion.text_input?.length ?? 0} Karakter
                            </span>
                        </div>
                        <div className="bg-stone-50/50 rounded-[28px] p-7 border border-orange-100/50 shadow-inner overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                                <Mic2 className="w-24 h-24 rotate-12" />
                            </div>
                            <p className="relative text-[15px] md:text-base font-medium text-orange-950/80 leading-[1.8] whitespace-pre-wrap">
                                {conversion.text_input}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-6 border-t border-orange-100 flex items-center gap-4 bg-orange-50/20">
                    <button
                        onClick={handleCopyHtml}
                        className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 rounded-2xl font-semibold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${copyId === conversion.id
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                    >
                        {copyId === conversion.id ? <Check className="h-4 w-4 shrink-0" /> : <Code className="h-4 w-4 shrink-0" />}
                        <span className="truncate">{copyId === conversion.id ? 'Tersalin!' : 'Salin untuk Backend'}</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 md:flex-none md:px-12 py-4 bg-zinc-900 text-white rounded-2xl font-semibold text-[10px] md:text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
