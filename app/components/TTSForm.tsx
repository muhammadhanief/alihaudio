"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl, getAssetUrl } from "@/lib/utils";
import { CheckCircle2, Code, Check } from "lucide-react";

const LANGUAGES = [
  { code: "id-ID", name: "Bahasa Indonesia", flagCode: "id" },
  { code: "en-US", name: "English (US)", flagCode: "us" },
  { code: "ja-JP", name: "Japanese", flagCode: "jp" },
  { code: "ko-KR", name: "Korean", flagCode: "kr" },
  { code: "fr-FR", name: "French", flagCode: "fr" },
  { code: "de-DE", name: "German", flagCode: "de" },
  { code: "es-ES", name: "Spanish", flagCode: "es" },
  { code: "ru-RU", name: "Russian", flagCode: "ru" },
  { code: "ar-XA", name: "Arabic", flagCode: "sa" },
];

const EDGE_VOICES_MALE = [
  { code: "id-ID-ArdiNeural", name: "Bahasa Indonesia (Ardi)", flagCode: "id" },
  { code: "en-US-GuyNeural", name: "English US (Guy)", flagCode: "us" },
  { code: "en-GB-RyanNeural", name: "English UK (Ryan)", flagCode: "gb" },
  { code: "ja-JP-KeitaNeural", name: "Japanese (Keita)", flagCode: "jp" },
  { code: "ko-KR-InJoonNeural", name: "Korean (InJoon)", flagCode: "kr" },
  { code: "fr-FR-HenriNeural", name: "French (Henri)", flagCode: "fr" },
  { code: "de-DE-KilianNeural", name: "German (Kilian)", flagCode: "de" },
  { code: "es-ES-AlvaroNeural", name: "Spanish (Alvaro)", flagCode: "es" },
  { code: "ar-SA-HamedNeural", name: "Arabic (Hamed)", flagCode: "sa" },
];

const EDGE_VOICES_FEMALE = [
  { code: "id-ID-GadisNeural", name: "Bahasa Indonesia (Gadis)", flagCode: "id" },
  { code: "en-US-AriaNeural", name: "English US (Aria)", flagCode: "us" },
  { code: "en-GB-SoniaNeural", name: "English UK (Sonia)", flagCode: "gb" },
  { code: "ja-JP-NanamiNeural", name: "Japanese (Nanami)", flagCode: "jp" },
  { code: "ko-KR-SunHiNeural", name: "Korean (SunHi)", flagCode: "kr" },
  { code: "fr-FR-DeniseNeural", name: "French (Denise)", flagCode: "fr" },
  { code: "de-DE-AmalaNeural", name: "German (Amala)", flagCode: "de" },
  { code: "es-ES-ElviraNeural", name: "Spanish (Elvira)", flagCode: "es" },
  { code: "ar-SA-ZariyahNeural", name: "Arabic (Zariyah)", flagCode: "sa" },
];

const FEMALE_ENGINES = [
  { code: "edge", name: "Microsoft Edge TTS (Gratis)" },
  { code: "google", name: "Google Cloud (Banyak Bahasa)" }
];

const MALE_ENGINES = [
  { code: "huggingface", name: "Microsoft Edge TTS (Gratis)" },
  { code: "puter", name: "OpenAI (Puter.js)" }
];

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Pilih..."
}: {
  value: string,
  onChange: (v: string) => void,
  options: { code: string, name: string, flagCode?: string }[],
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.code === value);

  return (
    <div className="relative w-full group">
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); setIsOpen(!isOpen) }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full flex items-center justify-between px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm text-left"
        style={{ color: '#7c2d12', backgroundColor: 'rgba(255,237,213,0.85)' }}
      >
        <div className="flex items-center gap-3">
          {selected?.flagCode && (
            <img
              src={`https://flagcdn.com/w20/${selected.flagCode}.png`}
              alt={selected.flagCode}
              className="w-5 h-auto rounded-[2px] shadow-sm border border-black/10"
            />
          )}
          <span>{selected ? selected.name : placeholder}</span>
        </div>
        <div className={`text-orange-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-orange-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange(opt.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm text-left transition-colors ${value === opt.code
                ? 'bg-orange-50/80 text-orange-900 font-bold'
                : 'text-stone-700 hover:bg-orange-50 font-medium'
                }`}
            >
              {opt.flagCode && (
                <img
                  src={`https://flagcdn.com/w20/${opt.flagCode}.png`}
                  alt={opt.flagCode}
                  className="w-5 h-auto rounded-[2px] shadow-sm border border-black/10"
                />
              )}
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

declare global {
  interface Window {
    puter: any;
  }
}

export default function TTSForm({ isGuest = false, onSuccess }: { isGuest?: boolean, onSuccess?: () => void }) {
  const router = useRouter();
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

  const [savedAudioPath, setSavedAudioPath] = useState("");
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // New Hugging Face states
  const [maleEngine, setMaleEngine] = useState<"puter" | "huggingface">("huggingface");
  const [hfVoice, setHfVoice] = useState("id-ID-ArdiNeural");
  const [femaleEngine, setFemaleEngine] = useState<"google" | "edge">("edge");
  const [edgeFemaleVoice, setEdgeFemaleVoice] = useState("id-ID-GadisNeural");

  const splitText = (input: string, mode: "free" | "puter") => {
    const maxLength = (mode === "puter" || (mode === "free" && femaleEngine === "edge")) ? 2500 : 200; // Tingkatkan ke 200 untuk Google
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
    if (mode === 'free' && femaleEngine === 'google' && !lang) {
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
          if (maleEngine === "puter") {
            if (!window.puter) throw new Error("Puter.js belum siap.");
            const audio = await window.puter.ai.txt2speech(chunks[i], {
              provider: 'openai',
              model: 'gpt-4o-mini-tts',
              voice: 'onyx'
            });
            const response = await fetch(audio.src);
            audioBlobs.push(await response.blob());
          } else if (maleEngine === "huggingface") {
            // TERHUBUNG DENGAN MICROSERVICE EKSTERNAL ANDA
            const edgeApiUrl = process.env.NEXT_PUBLIC_EDGE_TTS_API_URL || "http://localhost:8080/api/edge-tts";
            const hfResponse = await fetch(edgeApiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: chunks[i],
                model: hfVoice
              })
            });

            if (!hfResponse.ok) {
              let errMsg = "Gagal menghasilkan audio dengan Hugging Face";
              try {
                const errData = await hfResponse.json();
                if (errData.message) errMsg = errData.message;
              } catch (e) { }
              throw new Error(errMsg);
            }

            audioBlobs.push(await hfResponse.blob());
          }
        } else {
          // MODE PEREMPUAN: Mendukung Multi-Chunk
          if (femaleEngine === "edge") {
            // TERHUBUNG DENGAN MICROSERVICE EKSTERNAL ANDA
            const edgeApiUrl = process.env.NEXT_PUBLIC_EDGE_TTS_API_URL || "http://localhost:8080/api/edge-tts";
            const hfResponse = await fetch(edgeApiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: chunks[i],
                model: edgeFemaleVoice
              })
            });

            if (!hfResponse.ok) {
              let errMsg = "Gagal menghasilkan audio dengan Edge TTS";
              try {
                const errData = await hfResponse.json();
                if (errData.message) errMsg = errData.message;
              } catch (e) { }
              throw new Error(errMsg);
            }

            audioBlobs.push(await hfResponse.blob());
          } else {
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
        }
        setProgress(Math.round(((i + 1) / chunks.length) * 100));
      }

      const combinedBlob = new Blob(audioBlobs, { type: "audio/mpeg" });
      const finalAudioUrl = URL.createObjectURL(combinedBlob);
      setAudioUrl(finalAudioUrl);
      const computedProvider = mode === "puter" ? (maleEngine === "huggingface" ? "huggingface" : "puter-ai") : (femaleEngine === "edge" ? "edge" : "google-free");
      setProvider(computedProvider);
      setShowSuccess(true);

      // Auto-save to database with REAL MP3 data
      try {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("judul", judul || "");
        formData.append("mode", mode);
        formData.append("lang", lang || "");
        formData.append("provider", computedProvider);
        formData.append("audio", combinedBlob, "voice.mp3");
        if (isGuest) formData.append("isGuest", "true");

        const res = await fetch(getApiUrl("/api/save-conversion"), {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.audioPath) {
          setSavedAudioPath(data.audioPath);
          if (isGuest && onSuccess) {
            onSuccess();
          }
        }
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
        <div className="p-1 container max-w-lg bg-orange-100/30  rounded-[20px] border border-orange-200/50  backdrop-blur-3xl flex shadow-xl transition-all duration-300">
          <button
            type="button"
            onClick={() => setMode("puter")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${mode === "puter"
              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
              : "text-orange-900/60 text-stone-400 hover:text-orange-900 hover:text-stone-200"
              }`}
          >
            <span className="text-lg">♂</span> Laki-laki
          </button>
          <button
            type="button"
            onClick={() => setMode("free")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${mode === "free"
              ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20"
              : "text-orange-900/60 text-stone-400 hover:text-orange-900 hover:text-stone-200"
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
            <label htmlFor="judul" className="text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase">
              Judul <span className="text-orange-500">*</span>
            </label>
          </div>
          <input
            id="judul"
            type="text"
            className="w-full px-6 py-4 border border-orange-200/50 rounded-[20px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-sm font-medium shadow-md"
            style={{ color: '#1c0a00', backgroundColor: 'rgba(255,255,255,0.82)' }}
            placeholder="Contoh: Berita Pagi — Kependudukan Jawa Tengah"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 transition-all duration-300 relative z-20`}>
          {/* Main Input Area */}
          <div className={`lg:col-span-9 space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <label className="text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase whitespace-nowrap">Teks Sumber</label>
                </div>
                {mode === 'puter' && maleEngine === 'puter' && (
                  <span className="text-[8px] font-semibold bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full border border-orange-500/20 animate-fade-in uppercase tracking-wider text-orange-400">
                    Auto-detect Bahasa
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                {text.length > (mode === 'free' ? 150 : 2500) && (
                  <span className="text-[9px] font-semibold bg-orange-500/5 bg-orange-500/10 px-2 py-0.5 rounded text-orange-600 text-orange-400 border border-orange-500/10 border-orange-500/20 tracking-tighter">MULTI-CHUNK MODE</span>
                )}
                <span className={`text-[9px] font-medium tracking-widest ${text.length > 3000 ? 'text-red-500' : 'text-orange-900/40 text-stone-500'}`}>
                  {text.length.toLocaleString()} KARAKTER
                </span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
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

          {/* Sidebar Controls */}
          <div className="lg:col-span-3 space-y-6 animate-fade-in relative z-20">
            {mode === 'free' && (
              <div className="space-y-4">
                <label className="block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1">Engine Suara (Perempuan)</label>
                <div className="relative group mt-1">
                  <CustomSelect
                    value={femaleEngine}
                    onChange={(v) => setFemaleEngine(v as any)}
                    options={FEMALE_ENGINES}
                  />
                </div>

                {femaleEngine === 'google' && (
                  <div className="space-y-4 mt-6">
                    <label className="block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1">Logat Bahasa Suara</label>
                    <div className="relative group mt-1 z-[11]">
                      <CustomSelect
                        value={lang}
                        onChange={setLang}
                        options={LANGUAGES}
                        placeholder="--- Pilih Bahasa ---"
                      />
                    </div>
                  </div>
                )}

                {femaleEngine === 'edge' && (
                  <div className="space-y-4 mt-6">
                    <label className="block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1">Pilihan Suara (Logat)</label>
                    <div className="relative group mt-1 z-[11]">
                      <CustomSelect
                        value={edgeFemaleVoice}
                        onChange={setEdgeFemaleVoice}
                        options={EDGE_VOICES_FEMALE}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'puter' && (
              <div className="space-y-4">
                <label className="block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1">Engine Suara</label>
                <div className="relative group z-[12]">
                  <CustomSelect
                    value={maleEngine}
                    onChange={(v) => setMaleEngine(v as any)}
                    options={MALE_ENGINES}
                  />
                </div>

                {maleEngine === 'huggingface' && (
                  <div className="space-y-4 mt-6">
                    <label className="block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1">Pilihan Suara (Logat)</label>
                    <div className="relative group mt-1 z-[11]">
                      <CustomSelect
                        value={hfVoice}
                        onChange={setHfVoice}
                        options={EDGE_VOICES_MALE}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-t border-orange-100 pt-4 text-orange-900/50 text-stone-500 relative z-10">
          <div className="hidden md:flex flex-col gap-0.5 text-left" suppressHydrationWarning>
            <p className="text-[10px] font-semibold tracking-widest uppercase">Estimasi Hasil</p>
            <p className="text-xs font-medium italic">~{Math.max(1, Math.floor(text.length / 15))} Detik Audio</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative overflow-hidden w-full md:w-auto px-12 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-xl shadow-orange-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 group-hover:h-full transition-all duration-150"></div>
          </button>
        </div>
      </form >

      {/* Loading Overlay Modal (Light UI) */}
      {
        isLoading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm animate-fade-in" />

            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-16 h-16 mx-auto mb-4">
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
                    className="text-orange-600 transition-all duration-300 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-orange-950 leading-none">{progress}%</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-stone-900">Sedang diproses...</h3>
              <p className="text-sm font-medium text-stone-500 mt-1 mb-6">Mohon tunggu, teks sedang dikonversi</p>

              <div className="flex justify-center gap-1.5 pb-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Warning Notification Modal (Light UI) */}
      {
        showWarning && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm animate-fade-in" onClick={() => setShowWarning(false)} />

            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-stone-900">Pilih Bahasa Dulu</h3>
              <p className="text-sm font-medium text-stone-500 mt-1 mb-6">
                Mode <span className="text-orange-600 font-semibold">Perempuan</span> memerlukan pilihan bahasa agar pelafalan sesuai.
              </p>

              <button
                onClick={() => setShowWarning(false)}
                className="w-full py-2.5 bg-stone-100 text-stone-700 font-semibold text-sm rounded-xl hover:bg-stone-200 transition shadow-sm"
              >
                Mengerti
              </button>
            </div>
          </div>
        )
      }

      {/* Success Notification Modal (Light UI) */}
      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />

          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-stone-900">Audio Berhasil Dibuat</h3>
            <p className="text-sm font-medium text-stone-500 mt-1 mb-6">Siap untuk diputar atau diunduh.</p>

            {isGuest ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-2.5 bg-green-50 text-green-700 font-semibold text-sm rounded-xl hover:bg-green-100 transition shadow-sm"
                >
                  Tutup & Lihat Code Embed
                </button>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    router.push("/guest/my-conversions");
                  }}
                  className="w-full py-2.5 bg-stone-100 text-stone-700 font-semibold text-sm rounded-xl hover:bg-stone-200 transition shadow-sm"
                >
                  Buka Alih Audio Saya
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSuccess(false);
                  router.push("/my-conversions");
                }}
                className="w-full py-2.5 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition shadow-sm"
              >
                Lihat di Daftar Audio
              </button>
            )}
          </div>
        </div>
      )}

      {/* Result Dashboard */}
      {
        audioUrl && (
          <div className="animate-slide-up group relative p-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 rounded-[44px] blur-xl opacity-20 opacity-40 group-hover:opacity-30 transition duration-500"></div>

            <div className="relative glass rounded-[32px] p-5 md:p-6 overflow-hidden">
              {/* Visual Glow Ornament */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px]"></div>

              <div className="relative flex flex-col gap-6">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
                  <div className="space-y-0.5">
                    <h3 className="text-xl font-bold text-stone-100 tracking-tight leading-none">Audio Selesai</h3>
                    <div className="flex items-center gap-2">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                      <p className="text-[9px] font-medium text-stone-500 tracking-[0.1em] uppercase">Status: Siap Unduh</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full border bg-orange-500/5 text-orange-400 border-orange-500/20 text-[9px] font-semibold tracking-[0.1em] uppercase">
                    {provider === 'puter-ai' ? 'OPENAI ONYX' : (provider === 'huggingface' || provider === 'edge' ? 'MICROSOFT EDGE' : 'GOOGLE CLOUD')}
                  </div>
                </div>

                {/* Audio Player */}
                <div className="bg-black/50 p-2 rounded-[24px] shadow-inner transition-colors duration-300">
                  <audio controls src={audioUrl} className="w-full h-12 scale-[0.98] transition-transform" key={audioUrl}>
                    Browser Anda tidak mendukung elemen audio.
                  </audio>
                </div>

                {/* Action Controls Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md transform hover:-rotate-1 active:scale-95 text-[10px] md:text-xs tracking-widest uppercase"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    UNDUH MP3
                  </button>

                  {/* Guest Embed Code Section - Side By Side on Desktop */}
                  {isGuest && savedAudioPath && (() => {
                    const fullUrl = `${window.location.origin}${getAssetUrl(savedAudioPath)}`;
                    const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;

                    return (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(htmlSnippet);
                          setCopiedEmbed(true);
                          setTimeout(() => setCopiedEmbed(false), 2000);
                        }}
                        className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 ${copiedEmbed
                          ? 'bg-green-500 text-white shadow-green-500/20'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-blue-600/10'}`}
                      >
                        {copiedEmbed ? <Check className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                        {copiedEmbed ? 'Embed Tersalin!' : 'Salin HTML Backend'}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
