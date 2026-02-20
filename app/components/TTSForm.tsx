"use client";

import { useState } from "react";
import { getApiUrl } from "@/lib/utils";

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

declare global {
  interface Window {
    puter: any;
  }
}

export default function TTSForm() {
  const [text, setText] = useState("");
  const [judul, setJudul] = useState("");
  const [lang, setLang] = useState("");
  const [mode, setMode] = useState<"free" | "puter">("puter");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [provider, setProvider] = useState("");
  const [multiAudioUrls, setMultiAudioUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const splitText = (input: string, mode: "free" | "puter") => {
    const maxLength = mode === "puter" ? 2500 : 200; // Tingkatkan ke 200 untuk Google
    const chunks = [];
    let currentChunk = "";

    const sentences = input.split(/([.,!?;]\s+)/);

    for (let i = 0; i < sentences.length; i++) {
      const part = sentences[i];
      if ((currentChunk + part).length > maxLength) {
        if (currentChunk) chunks.push(currentChunk.trim());
        if (part.length > maxLength) {
          const words = part.split(' ');
          let subChunk = "";
          for (let word of words) {
            if ((subChunk + word).length > maxLength) {
              chunks.push(subChunk.trim());
              subChunk = word + " ";
            } else {
              subChunk += word + " ";
            }
          }
          currentChunk = subChunk;
        } else {
          currentChunk = part;
        }
      } else {
        currentChunk += part;
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks;
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    // Validation for language selection in Perempuan mode
    if (mode === 'free' && !lang) {
      setShowWarning(true);
      return;
    }

    setIsLoading(true);
    setAudioUrl("");
    setShowSuccess(false);
    setProgress(0);

    try {
      const audioBlobs: Blob[] = [];
      const chunks = splitText(text, mode);

      for (let i = 0; i < chunks.length; i++) {
        setProgress(Math.round(((i + 0.2) / chunks.length) * 100));

        if (mode === "puter") {
          if (!window.puter) throw new Error("Puter.js belum siap.");
          const audio = await window.puter.ai.txt2speech(chunks[i], {
            provider: 'openai',
            model: 'gpt-4o-mini-tts',
            voice: 'onyx'
          });
          const response = await fetch(audio.src);
          audioBlobs.push(await response.blob());
        } else {
          // MODE PEREMPUAN: Mendukung Multi-Chunk (Bebas Limit 200)
          try {
            const createRes = await fetch("https://api.soundoftext.com/sounds", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                engine: "google",
                data: { text: chunks[i], voice: lang }
              })
            });

            if (!createRes.ok) throw new Error("Gagal membuat antrean suara.");
            const { id } = await createRes.json();

            // Polling
            let status = "Pending";
            let location = "";
            let attempts = 0;
            while (status !== "Done" && attempts < 10) {
              await new Promise(r => setTimeout(r, 1000));
              const checkRes = await fetch(`https://api.soundoftext.com/sounds/${id}`);
              const data = await checkRes.json();
              status = data.status;
              location = data.location;
              attempts++;
            }

            if (status === "Done" && location) {
              // COBA AMBIL BLOB via CORS PROXY (Agar bisa digabung otomatis)
              try {
                const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(location)}`;
                const audioRes = await fetch(proxyUrl);
                if (audioRes.ok) {
                  audioBlobs.push(await audioRes.blob());
                } else {
                  throw new Error("CORS Blocked");
                }
              } catch (proxyErr) {
                // FALLBACK: Buka Manual jika Proxy gagal
                const goManual = window.confirm(
                  `BAGIAN ${i + 1}/${chunks.length} SIAP!\n\n` +
                  "Klik OK untuk mendownload bagian ini, lalu upload di kotak kanan."
                );
                if (goManual) window.open(location, '_blank');
              }
            }
          } catch (e: any) {
            console.error("Multi-chunk processing error:", e);
          }
        }
        setProgress(Math.round(((i + 1) / chunks.length) * 100));
      }

      const combinedBlob = new Blob(audioBlobs, { type: "audio/mpeg" });
      const finalAudioUrl = URL.createObjectURL(combinedBlob);
      setAudioUrl(finalAudioUrl);
      setProvider(mode === "puter" ? "puter-ai" : "google-free");
      setShowSuccess(true);

      // Auto-save to database with REAL MP3 data
      try {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("judul", judul || "");
        formData.append("mode", mode);
        formData.append("lang", lang || "");
        formData.append("provider", mode === "puter" ? "puter-ai" : "google-free");
        formData.append("audio", combinedBlob, "voice.mp3");

        await fetch(getApiUrl("/api/save-conversion"), {
          method: "POST",
          body: formData,
        });
      } catch (saveError) {
        console.error("Failed to save conversion to DB:", saveError);
      }

    } catch (error: any) {
      console.error("TTS Error:", error);
      alert(error.message || "Gagal membuat audio.");
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `voice-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4">
      {/* Tab Switcher */}
      <div className="flex flex-col items-center gap-4">
        <div className="p-1 container max-w-lg bg-orange-100/30 dark:bg-white/5 rounded-[20px] border border-orange-200/50 dark:border-white/10 backdrop-blur-3xl flex shadow-xl transition-all duration-500">
          <button
            type="button"
            onClick={() => setMode("puter")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-black tracking-widest uppercase transition-all duration-500 ${mode === "puter"
              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
              : "text-orange-900/60 dark:text-stone-400 hover:text-orange-900 dark:hover:text-stone-200"
              }`}
          >
            <span className="text-lg">♂</span> Laki-laki
          </button>
          <button
            type="button"
            onClick={() => setMode("free")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-black tracking-widest uppercase transition-all duration-500 ${mode === "free"
              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
              : "text-orange-900/60 dark:text-stone-400 hover:text-orange-900 dark:hover:text-stone-200"
              }`}
          >
            <span className="text-lg">♀</span> Perempuan
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
        {/* ── Input Judul ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <label htmlFor="judul" className="text-[10px] font-black text-orange-900/50 tracking-[0.2em] uppercase">
              Judul <span className="text-orange-500">*</span>
            </label>
          </div>
          <input
            id="judul"
            type="text"
            className="w-full px-6 py-4 border border-orange-200/50 rounded-[20px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-sm font-bold shadow-md"
            style={{ color: '#1c0a00', backgroundColor: 'rgba(255,255,255,0.82)' }}
            placeholder="Contoh: Berita Pagi — Kependudukan Jawa Tengah"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div className={`grid grid-cols-1 ${mode === 'free' ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-4 transition-all duration-500`}>
          {/* Main Input Area */}
          <div className={`${mode === 'free' ? 'lg:col-span-9' : 'lg:col-span-1'} space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <label className="text-[10px] font-black text-orange-900/50 dark:text-stone-500 tracking-[0.2em] uppercase whitespace-nowrap">Teks Sumber</label>
                </div>
                {mode === 'puter' && (
                  <span className="text-[8px] font-black bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20 animate-fade-in uppercase tracking-wider">
                    Auto-detect Bahasa
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                {text.length > (mode === 'free' ? 150 : 2500) && (
                  <span className="text-[9px] font-black bg-orange-500/5 dark:bg-orange-500/10 px-2 py-0.5 rounded text-orange-600 dark:text-orange-400 border border-orange-500/10 dark:border-orange-500/20 tracking-tighter">MULTI-CHUNK MODE</span>
                )}
                <span className={`text-[9px] font-black tracking-widest ${text.length > 3000 ? 'text-red-500' : 'text-orange-900/40 dark:text-stone-500'}`}>
                  {text.length.toLocaleString()} KARAKTER
                </span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
              <textarea
                id="text"
                rows={mode === 'free' ? 8 : 10}
                className="relative w-full px-6 py-5 bg-white/80 border border-orange-200/50 rounded-[24px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-base leading-[1.6] resize-none scroll-smooth shadow-lg"
                style={{ color: '#1c0a00', backgroundColor: 'rgba(255,255,255,0.82)' }}
                placeholder="Ketik atau tempel naskah Anda di sini..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Sidebar Controls - Only shown in Perempuan (Free) mode */}
          {mode === 'free' && (
            <div className="lg:col-span-3 space-y-6 animate-fade-in">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-orange-900/50 dark:text-stone-500 tracking-[0.2em] uppercase px-1">Logat Bahasa Suara</label>
                <div className="relative group">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm"
                    style={{ color: '#7c2d12', backgroundColor: 'rgba(255,237,213,0.85)' }}
                  >
                    <option value="" disabled hidden>--- Pilih Bahasa ---</option>
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code} className="bg-white dark:bg-stone-900">
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

              {/* Manual Upload Section */}
              <div className="space-y-4 pt-4 border-t border-orange-100 dark:border-white/5">
                <label className="block text-[10px] font-black text-orange-900/50 dark:text-stone-500 tracking-[0.2em] uppercase px-1">Upload Manual (Jika Perlu)</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setAudioUrl(url);
                        setProvider("google-manual");

                        // Auto-save manually uploaded file
                        const formData = new FormData();
                        formData.append("text", text || "Manual Upload");
                        formData.append("judul", judul || "Manual Upload");
                        formData.append("mode", mode);
                        formData.append("lang", lang || "");
                        formData.append("provider", "google-manual");
                        formData.append("audio", file); // file is already a File/Blob (multipart)

                        await fetch(getApiUrl("/api/save-conversion"), {
                          method: "POST",
                          body: formData,
                        });
                        setShowSuccess(true);
                      }
                    }}
                    className="w-full text-xs text-orange-900/40 dark:text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-orange-500/10 file:text-orange-600 hover:file:bg-orange-500/20 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-t border-orange-100 dark:border-white/10 pt-4 text-orange-900/50 dark:text-stone-500">
          <div className="hidden md:flex flex-col gap-0.5 text-left" suppressHydrationWarning>
            <p className="text-[10px] font-black tracking-widest uppercase">Estimasi Hasil</p>
            <p className="text-xs font-bold italic">~{Math.max(1, Math.floor(text.length / 15))} Detik Audio</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative overflow-hidden w-full md:w-auto px-12 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black shadow-xl shadow-orange-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-[10px]">
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Memproses ({progress}%)
                </>
              ) : (
                <>Konversi ke Suara <span className="text-base opacity-50">→</span></>
              )}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 group-hover:h-full transition-all duration-300"></div>
          </button>
        </div>
      </form>

      {/* Loading Overlay Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-md animate-fade-in" />

          <div className="relative glass-card bg-white p-10 rounded-[40px] shadow-2xl max-w-sm w-full text-center space-y-8 animate-slide-up border border-orange-500/20">
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none" stroke="currentColor"
                  strokeWidth="8" className="text-orange-500/10"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none" stroke="currentColor"
                  strokeWidth="8" strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * progress) / 100}
                  className="text-orange-600 transition-all duration-500 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-orange-950 leading-none">{progress}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black text-orange-950 tracking-tight">Sedang diproses...</h3>
              <p className="text-sm font-medium text-orange-900/50">Mohon tunggu, teks sedang dikonversi ke audio</p>
            </div>

            <div className="flex justify-center gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Warning Notification Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowWarning(false)} />

          <div className="relative glass-card bg-white p-8 rounded-[40px] shadow-3xl max-w-sm w-full text-center space-y-6 animate-slide-up border border-orange-500/30">
            <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto text-orange-600 border border-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-orange-950 tracking-tight">Pilih Bahasa Dulu</h3>
              <p className="text-sm font-medium text-orange-900/60 leading-relaxed">
                Mode <span className="text-orange-600 font-bold">Perempuan</span> memerlukan pilihan bahasa agar pelafalan sesuai.
              </p>
            </div>

            <button
              onClick={() => setShowWarning(false)}
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowSuccess(false)} />

          <div className="relative glass-card bg-white p-8 rounded-[40px] shadow-3xl max-w-sm w-full text-center space-y-6 animate-slide-up border border-green-500/20">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-orange-950 tracking-tight">Selesai!</h3>
              <p className="text-sm font-medium text-orange-900/50">Audio sudah siap diputar atau diunduh.</p>
            </div>

            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Lihat Hasil
            </button>
          </div>
        </div>
      )}

      {/* Result Dashboard */}
      {audioUrl && (
        <div className="animate-slide-up group relative p-1">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 rounded-[44px] blur-xl opacity-20 dark:opacity-40 group-hover:opacity-30 transition duration-1000"></div>

          <div className="relative glass rounded-[32px] p-5 md:p-6 overflow-hidden">
            {/* Visual Glow Ornament */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px]"></div>

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h3 className="text-xl font-black text-orange-950 dark:text-stone-100 tracking-tight leading-none">Audio Selesai</h3>
                    <div className="flex items-center gap-2">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                      <p className="text-[9px] font-black text-orange-900/50 dark:text-stone-500 tracking-[0.1em] uppercase">Status: Siap Unduh</p>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full border bg-orange-500/5 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20 text-[9px] font-black tracking-[0.1em] uppercase">
                    {provider === 'puter-ai' ? 'OPENAI ONYX' : 'GOOGLE CLOUD'}
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-black/50 p-1.5 rounded-[20px] shadow-inner transition-colors duration-500">
                  <audio controls src={audioUrl} className="w-full h-12 scale-[0.98] transition-transform" key={audioUrl}>
                    Browser Anda tidak mendukung elemen audio.
                  </audio>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full md:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black transition-all flex items-center justify-center gap-3 shadow-md transform hover:-rotate-1 active:scale-95 text-[10px] tracking-widest uppercase"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  UNDUH MP3
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
