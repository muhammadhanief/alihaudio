"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/utils";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const LANGUAGES = [
    { code: "id-ID", name: "Bahasa Indonesia", icon: "🇮🇩" },
    { code: "en-US", name: "English (US)", icon: "🇺🇸" },
    { code: "ja-JP", name: "Japanese", icon: "🇯🇵" },
    { code: "ko-KR", name: "Korean", icon: "🇰🇷" },
    { code: "fr-FR", name: "French", icon: "🇫🇷" },
    { code: "de-DE", name: "German", icon: "🇩🇪" },
    { code: "es-ES", name: "Spanish", icon: "es" },
    { code: "ru-RU", name: "Russian", icon: "🇷🇺" },
    { code: "ar-XA", name: "Arabic", icon: "🇸🇦" },
];

export default function UploadAudioPage() {
    const router = useRouter();
    const [judul, setJudul] = useState("");
    const [text, setText] = useState("");
    const [mode, setMode] = useState<"free" | "puter">("free");
    const [lang, setLang] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("text", text || "Manual Upload");
            formData.append("judul", judul || "Manual Upload");
            formData.append("mode", mode);
            formData.append("lang", lang || "");
            formData.append("provider", "google-manual"); // Just to mark it as manual
            formData.append("audio", file);

            await fetch(getApiUrl("/api/save-conversion"), {
                method: "POST",
                body: formData,
            });
            setShowSuccess(true);
            setJudul("");
            setText("");
            setFile(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-orange-950 tracking-tighter uppercase">Upload Alih Audio Manual</h1>
                <p className="text-orange-900/50 text-xs font-medium uppercase tracking-widest mt-1">Upload file MP3 dari luar untuk disimpan ke sistem</p>
            </div>

            {/* Main Form Area */}
            <main className="glass rounded-[40px] p-5 md:p-8 shadow-2xl relative overflow-hidden border border-orange-200/50">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <label htmlFor="judul" className="text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase">
                                Judul <span className="text-orange-500">*</span>
                            </label>
                        </div>
                        <input
                            id="judul"
                            type="text"
                            required
                            className="w-full px-6 py-4 border border-orange-200/50 rounded-[20px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-sm font-medium shadow-md bg-white/80"
                            placeholder="Contoh: Berita Pagi — Kependudukan Jawa Tengah"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 px-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <label className="text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase">
                                Teks Sumber (Opsional)
                            </label>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Teks yang berhubungan dengan audio ini..."
                            className="w-full p-6 border border-orange-200/50 rounded-[24px] focus:ring-1 focus:ring-orange-500/40 outline-none resize-none transition-all text-sm shadow-md min-h-[120px] max-h-[400px] bg-white/80"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase px-1">Logat / Mode Suara</label>
                            <div className="flex gap-2 p-1.5 bg-orange-500/5 rounded-[20px] border border-orange-200/50 shadow-sm relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--tw-gradient-stops))' }}></div>
                                <button
                                    type="button"
                                    onClick={() => setMode("puter")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-bold tracking-widest uppercase transition-all duration-500 ${mode === "puter"
                                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
                                        : "text-orange-900/60 hover:text-orange-900"
                                        }`}
                                >
                                    Pria
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("free")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-bold tracking-widest uppercase transition-all duration-500 ${mode === "free"
                                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
                                        : "text-orange-900/60 hover:text-orange-900"
                                        }`}
                                >
                                    Wanita
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase px-1">Logat Bahasa Suara <span className="text-orange-500">*</span></label>
                            <div className="relative group">
                                <select
                                    value={lang}
                                    onChange={(e) => setLang(e.target.value)}
                                    required
                                    className="w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm"
                                    style={{ color: '#7c2d12', backgroundColor: 'rgba(255,237,213,0.85)' }}
                                >
                                    <option value="" disabled hidden>--- Pilih Bahasa ---</option>
                                    {LANGUAGES.map((l) => (
                                        <option key={l.code} value={l.code} className="bg-white">
                                            {l.icon} {l.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-orange-100">
                        <label className="block text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase px-1">File Audio MP3 <span className="text-orange-500">*</span></label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept="audio/*"
                                required
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="w-full text-xs text-orange-900/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-orange-500/10 file:text-orange-600 hover:file:bg-orange-500/20 cursor-pointer"
                            />
                        </div>
                        {file && <p className="text-xs text-orange-600 font-medium px-2 italic">File terpilih: {file.name}</p>}
                    </div>

                    <div className="pt-6 border-t border-orange-100 flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={isLoading || !file || !judul || !lang}
                            className="group ml-auto relative overflow-hidden px-12 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-xl shadow-orange-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? 'Mengupload...' : (
                                <>
                                    <UploadCloud className="h-4 w-4" />
                                    <span className="text-[10px] uppercase tracking-widest">Upload & Simpan</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>

            {/* Success Notification Modal (Light UI) */}
            {showSuccess && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => {
                        setShowSuccess(false);
                        router.push("/my-conversions");
                    }} />

                    <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>

                        <h3 className="text-lg font-bold text-stone-900">Audio Berhasil Disimpan</h3>
                        <p className="text-sm font-medium text-stone-500 mt-1 mb-6">Telah ditambahkan ke Daftar Audio Anda.</p>

                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                router.push("/my-conversions");
                            }}
                            className="w-full py-2.5 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition shadow-sm"
                        >
                            Ke Daftar Audio Saya
                        </button>
                    </div>
                </div>
            )}

            <footer className="text-center py-4 opacity-40">
                <p className="text-[8px] font-semibold tracking-widest text-zinc-400 uppercase">
                    Platform Konversi Audio Internal BPS
                </p>
            </footer>
        </div>
    );
}
