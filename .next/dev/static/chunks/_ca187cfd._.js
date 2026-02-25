(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getApiUrl",
    ()=>getApiUrl,
    "getAssetUrl",
    ()=>getAssetUrl
]);
/**
 * Utility to handle basePath consistently across local dev and production.
 * This ensures fetch calls work regardless of whether you are on 
 * http://localhost:3000/ or https://domain.com/alihaudio/
 */ const BASE_PATH = "/alihaudio";
const getApiUrl = (endpoint)=>{
    let [path, query] = endpoint.split('?');
    let cleanPath = path.startsWith("/") ? path : `/${path}`;
    // Fix for trailingSlash: true in next.config.js
    // If it's a directory-based route (no file extension), add trailing slash
    if (!cleanPath.endsWith('/')) {
        const parts = cleanPath.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart && !lastPart.includes('.')) {
            cleanPath += '/';
        }
    }
    const finalEndpoint = query ? `${cleanPath}?${query}` : cleanPath;
    return `${BASE_PATH}${finalEndpoint}`;
};
const getAssetUrl = (path)=>{
    if (!path) return "";
    if (path.startsWith("http")) return path;
    // REDIRECT: Paksa lewat API agar tidak kena 404 Apache/cPanel
    if (path.startsWith("/uploads/audio/")) {
        const fileName = path.replace("/uploads/audio/", "");
        return `${BASE_PATH}/api/audio/${fileName}`;
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_PATH}${cleanPath}`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/TTSForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TTSForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const LANGUAGES = [
    {
        code: "id-ID",
        name: "Bahasa Indonesia",
        icon: "🇮🇩"
    },
    {
        code: "en-US",
        name: "English (US)",
        icon: "🇺🇸"
    },
    {
        code: "ja-JP",
        name: "Japanese",
        icon: "🇯🇵"
    },
    {
        code: "ko-KR",
        name: "Korean",
        icon: "🇰🇷"
    },
    {
        code: "fr-FR",
        name: "French",
        icon: "🇫🇷"
    },
    {
        code: "de-DE",
        name: "German",
        icon: "🇩🇪"
    },
    {
        code: "es-ES",
        name: "Spanish",
        icon: "es"
    },
    {
        code: "ru-RU",
        name: "Russian",
        icon: "🇷🇺"
    },
    {
        code: "ar-XA",
        name: "Arabic",
        icon: "🇸🇦"
    }
];
const EDGE_VOICES_MALE = [
    {
        code: "id-ID-ArdiNeural",
        name: "Bahasa Indonesia (Ardi)",
        icon: "🇮🇩"
    },
    {
        code: "en-US-GuyNeural",
        name: "English US (Guy)",
        icon: "🇺🇸"
    },
    {
        code: "en-GB-RyanNeural",
        name: "English UK (Ryan)",
        icon: "🇬🇧"
    },
    {
        code: "ja-JP-KeitaNeural",
        name: "Japanese (Keita)",
        icon: "🇯🇵"
    },
    {
        code: "ko-KR-InJoonNeural",
        name: "Korean (InJoon)",
        icon: "🇰🇷"
    },
    {
        code: "fr-FR-HenriNeural",
        name: "French (Henri)",
        icon: "🇫🇷"
    },
    {
        code: "de-DE-KilianNeural",
        name: "German (Kilian)",
        icon: "🇩🇪"
    },
    {
        code: "es-ES-AlvaroNeural",
        name: "Spanish (Alvaro)",
        icon: "🇪🇸"
    },
    {
        code: "ar-SA-HamedNeural",
        name: "Arabic (Hamed)",
        icon: "🇸🇦"
    }
];
const EDGE_VOICES_FEMALE = [
    {
        code: "id-ID-GadisNeural",
        name: "Bahasa Indonesia (Gadis)",
        icon: "🇮🇩"
    },
    {
        code: "en-US-AriaNeural",
        name: "English US (Aria)",
        icon: "🇺🇸"
    },
    {
        code: "en-GB-SoniaNeural",
        name: "English UK (Sonia)",
        icon: "🇬🇧"
    },
    {
        code: "ja-JP-NanamiNeural",
        name: "Japanese (Nanami)",
        icon: "🇯🇵"
    },
    {
        code: "ko-KR-SunHiNeural",
        name: "Korean (SunHi)",
        icon: "🇰🇷"
    },
    {
        code: "fr-FR-DeniseNeural",
        name: "French (Denise)",
        icon: "🇫🇷"
    },
    {
        code: "de-DE-AmalaNeural",
        name: "German (Amala)",
        icon: "🇩🇪"
    },
    {
        code: "es-ES-ElviraNeural",
        name: "Spanish (Elvira)",
        icon: "🇪🇸"
    },
    {
        code: "ar-SA-ZariyahNeural",
        name: "Arabic (Zariyah)",
        icon: "🇸🇦"
    }
];
function TTSForm({ isGuest = false, onSuccess }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [judul, setJudul] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("puter");
    const [audioUrl, setAudioUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [multiAudioUrls, setMultiAudioUrls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [savedAudioPath, setSavedAudioPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // New Hugging Face states
    const [maleEngine, setMaleEngine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("huggingface");
    const [hfVoice, setHfVoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("id-ID-ArdiNeural");
    const [femaleEngine, setFemaleEngine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("edge");
    const [edgeFemaleVoice, setEdgeFemaleVoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("id-ID-GadisNeural");
    const splitText = (input, mode)=>{
        const maxLength = mode === "puter" || mode === "free" && femaleEngine === "edge" ? 2500 : 200; // Tingkatkan ke 200 untuk Google
        const chunks = [];
        let currentChunk = "";
        const sentences = input.split(/([.,!?;]\s+)/);
        for(let i = 0; i < sentences.length; i++){
            const part = sentences[i];
            if ((currentChunk + part).length > maxLength) {
                if (currentChunk) chunks.push(currentChunk.trim());
                if (part.length > maxLength) {
                    const words = part.split(' ');
                    let subChunk = "";
                    for (let word of words){
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
    const blobToBase64 = (blob)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    const handleSubmit = async (e)=>{
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
            const audioBlobs = [];
            const chunks = splitText(text, mode);
            for(let i = 0; i < chunks.length; i++){
                setProgress(Math.round((i + 0.2) / chunks.length * 100));
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
                        const edgeApiUrl = ("TURBOPACK compile-time value", "https://api-alihaudio.vercel.app/api/edge-tts") || "http://localhost:8080/api/edge-tts";
                        const hfResponse = await fetch(edgeApiUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
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
                            } catch (e) {}
                            throw new Error(errMsg);
                        }
                        audioBlobs.push(await hfResponse.blob());
                    }
                } else {
                    // MODE PEREMPUAN: Mendukung Multi-Chunk
                    if (femaleEngine === "edge") {
                        // TERHUBUNG DENGAN MICROSERVICE EKSTERNAL ANDA
                        const edgeApiUrl = ("TURBOPACK compile-time value", "https://api-alihaudio.vercel.app/api/edge-tts") || "http://localhost:8080/api/edge-tts";
                        const hfResponse = await fetch(edgeApiUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
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
                            } catch (e) {}
                            throw new Error(errMsg);
                        }
                        audioBlobs.push(await hfResponse.blob());
                    } else {
                        try {
                            const createRes = await fetch("https://api.soundoftext.com/sounds", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    engine: "google",
                                    data: {
                                        text: chunks[i],
                                        voice: lang
                                    }
                                })
                            });
                            if (!createRes.ok) throw new Error("Gagal membuat antrean suara.");
                            const { id } = await createRes.json();
                            // Polling
                            let status = "Pending";
                            let location = "";
                            let attempts = 0;
                            while(status !== "Done" && attempts < 10){
                                await new Promise((r)=>setTimeout(r, 1000));
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
                                    const goManual = window.confirm(`BAGIAN ${i + 1}/${chunks.length} SIAP!\n\n` + "Klik OK untuk mendownload bagian ini, lalu upload di kotak kanan.");
                                    if (goManual) window.open(location, '_blank');
                                }
                            }
                        } catch (e) {
                            console.error("Multi-chunk processing error:", e);
                        }
                    }
                }
                setProgress(Math.round((i + 1) / chunks.length * 100));
            }
            const combinedBlob = new Blob(audioBlobs, {
                type: "audio/mpeg"
            });
            const finalAudioUrl = URL.createObjectURL(combinedBlob);
            setAudioUrl(finalAudioUrl);
            const computedProvider = mode === "puter" ? maleEngine === "huggingface" ? "huggingface" : "puter-ai" : femaleEngine === "edge" ? "edge" : "google-free";
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
                const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/save-conversion"), {
                    method: "POST",
                    body: formData
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
        } catch (error) {
            console.error("TTS Error:", error);
            alert(error.message || "Gagal membuat audio.");
        } finally{
            setIsLoading(false);
            setProgress(0);
        }
    };
    const handleDownload = ()=>{
        if (!audioUrl) return;
        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = `voice-${Date.now()}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-1 container max-w-lg bg-orange-100/30  rounded-[20px] border border-orange-200/50  backdrop-blur-3xl flex shadow-xl transition-all duration-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setMode("puter"),
                            className: `flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${mode === "puter" ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20" : "text-orange-900/60 text-stone-400 hover:text-orange-900 hover:text-stone-200"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "♂"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, this),
                                " Laki-laki"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/TTSForm.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setMode("free"),
                            className: `flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[16px] text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${mode === "free" ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20" : "text-orange-900/60 text-stone-400 hover:text-orange-900 hover:text-stone-200"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "♀"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                " Perempuan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/TTSForm.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/TTSForm.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6 animate-slide-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "judul",
                                        className: "text-[10px] font-semibold text-orange-900/50 tracking-[0.2em] uppercase",
                                        children: [
                                            "Judul ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-orange-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 333,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "judul",
                                type: "text",
                                className: "w-full px-6 py-4 border border-orange-200/50 rounded-[20px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-sm font-medium shadow-md",
                                style: {
                                    color: '#1c0a00',
                                    backgroundColor: 'rgba(255,255,255,0.82)'
                                },
                                placeholder: "Contoh: Berita Pagi — Kependudukan Jawa Tengah",
                                value: judul,
                                onChange: (e)=>setJudul(e.target.value),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `grid grid-cols-1 lg:grid-cols-12 gap-4 transition-all duration-300`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `lg:col-span-9 space-y-4`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 353,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase whitespace-nowrap",
                                                                children: "Teks Sumber"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 354,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 17
                                                    }, this),
                                                    mode === 'puter' && maleEngine === 'puter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[8px] font-semibold bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full border border-orange-500/20 animate-fade-in uppercase tracking-wider text-orange-400",
                                                        children: "Auto-detect Bahasa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 351,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 sm:justify-end",
                                                children: [
                                                    text.length > (mode === 'free' ? 150 : 2500) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] font-semibold bg-orange-500/5 bg-orange-500/10 px-2 py-0.5 rounded text-orange-600 text-orange-400 border border-orange-500/10 border-orange-500/20 tracking-tighter",
                                                        children: "MULTI-CHUNK MODE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[9px] font-medium tracking-widest ${text.length > 3000 ? 'text-red-500' : 'text-orange-900/40 text-stone-500'}`,
                                                        children: [
                                                            text.length.toLocaleString(),
                                                            " KARAKTER"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 362,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 373,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "text",
                                                rows: mode === 'free' ? 8 : 10,
                                                className: "relative w-full px-6 py-5 bg-white/80 border border-orange-200/50 rounded-[24px] focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/60 outline-none transition-all text-base leading-[1.6] resize-none scroll-smooth shadow-lg",
                                                style: {
                                                    color: '#1c0a00',
                                                    backgroundColor: 'rgba(255,255,255,0.82)'
                                                },
                                                placeholder: "Ketik atau tempel naskah Anda di sini...",
                                                value: text,
                                                onChange: (e)=>setText(e.target.value),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 374,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 372,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-3 space-y-6 animate-fade-in",
                                children: [
                                    mode === 'free' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                children: "Engine Suara (Perempuan)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: femaleEngine,
                                                        onChange: (e)=>setFemaleEngine(e.target.value),
                                                        className: "w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm",
                                                        style: {
                                                            color: '#7c2d12',
                                                            backgroundColor: 'rgba(255,237,213,0.85)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "edge",
                                                                className: "bg-white text-stone-900",
                                                                children: "Microsoft Edge TTS (Gratis)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "google",
                                                                className: "bg-white text-stone-900",
                                                                children: "Google Cloud (Banyak Bahasa)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-4 w-4",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 3,
                                                                d: "M19 9l-7 7-7-7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this),
                                            femaleEngine === 'google' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                        children: "Logat Bahasa Suara"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 411,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: lang,
                                                                onChange: (e)=>setLang(e.target.value),
                                                                className: "w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm",
                                                                style: {
                                                                    color: '#7c2d12',
                                                                    backgroundColor: 'rgba(255,237,213,0.85)'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        disabled: true,
                                                                        hidden: true,
                                                                        children: "--- Pilih Bahasa ---"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    LANGUAGES.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: l.code,
                                                                            className: "bg-white bg-stone-900",
                                                                            children: [
                                                                                l.icon,
                                                                                " ",
                                                                                l.name
                                                                            ]
                                                                        }, l.code, true, {
                                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                                            lineNumber: 421,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    className: "h-4 w-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 3,
                                                                        d: "M19 9l-7 7-7-7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 426,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 410,
                                                columnNumber: 19
                                            }, this),
                                            femaleEngine === 'edge' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                        children: "Pilihan Suara (Logat)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: edgeFemaleVoice,
                                                                onChange: (e)=>setEdgeFemaleVoice(e.target.value),
                                                                className: "w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm",
                                                                style: {
                                                                    color: '#7c2d12',
                                                                    backgroundColor: 'rgba(255,237,213,0.85)'
                                                                },
                                                                children: EDGE_VOICES_FEMALE.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: v.code,
                                                                        className: "bg-white text-stone-900",
                                                                        children: [
                                                                            v.icon,
                                                                            " ",
                                                                            v.name
                                                                        ]
                                                                    }, v.code, true, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 446,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    className: "h-4 w-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 3,
                                                                        d: "M19 9l-7 7-7-7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                                    lineNumber: 452,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 436,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    mode === 'puter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                children: "Engine Suara"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 464,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: maleEngine,
                                                        onChange: (e)=>setMaleEngine(e.target.value),
                                                        className: "w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm",
                                                        style: {
                                                            color: '#7c2d12',
                                                            backgroundColor: 'rgba(255,237,213,0.85)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "huggingface",
                                                                className: "bg-white text-stone-900",
                                                                children: "Microsoft Edge TTS (Gratis)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "puter",
                                                                className: "bg-white text-stone-900",
                                                                children: "OpenAI (Puter.js)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            className: "h-4 w-4",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 3,
                                                                d: "M19 9l-7 7-7-7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 476,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, this),
                                            maleEngine === 'huggingface' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                        children: "Pilihan Suara (Logat)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: hfVoice,
                                                                onChange: (e)=>setHfVoice(e.target.value),
                                                                className: "w-full appearance-none px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm",
                                                                style: {
                                                                    color: '#7c2d12',
                                                                    backgroundColor: 'rgba(255,237,213,0.85)'
                                                                },
                                                                children: EDGE_VOICES_MALE.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: v.code,
                                                                        className: "bg-white text-stone-900",
                                                                        children: [
                                                                            v.icon,
                                                                            " ",
                                                                            v.name
                                                                        ]
                                                                    }, v.code, true, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-orange-400",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    className: "h-4 w-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 3,
                                                                        d: "M19 9l-7 7-7-7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 500,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-4 justify-between border-t border-orange-100  pt-4 text-orange-900/50 text-stone-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex flex-col gap-0.5 text-left",
                                suppressHydrationWarning: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-semibold tracking-widest uppercase",
                                        children: "Estimasi Hasil"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-medium italic",
                                        children: [
                                            "~",
                                            Math.max(1, Math.floor(text.length / 15)),
                                            " Detik Audio"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 514,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading,
                                className: "group relative overflow-hidden w-full md:w-auto px-12 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold shadow-xl shadow-orange-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-[10px]",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 19
                                                }, this),
                                                "Memproses (",
                                                progress,
                                                "%)"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Konversi ke Suara ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base opacity-50",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 h-1 bg-black/10 group-hover:h-full transition-all duration-150"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-950/60 backdrop-blur-md animate-fade-in"
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 541,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative glass-card bg-white p-10 rounded-[40px] shadow-2xl max-w-sm w-full text-center space-y-8 animate-slide-up border border-orange-500/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-24 h-24 mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-full h-full -rotate-90",
                                        viewBox: "0 0 100 100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "45",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "8",
                                                className: "text-orange-500/10"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 546,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "45",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "8",
                                                strokeDasharray: "282.7",
                                                strokeDashoffset: 282.7 - 282.7 * progress / 100,
                                                className: "text-orange-600 transition-all duration-300 ease-out",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 551,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 545,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xl font-semibold text-orange-950 leading-none",
                                            children: [
                                                progress,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 561,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 560,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-orange-950 tracking-tight",
                                        children: "Sedang diproses..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 566,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-orange-900/50",
                                        children: "Mohon tunggu, teks sedang dikonversi ke audio"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 567,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 565,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center gap-1.5",
                                children: [
                                    ...Array(3)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce",
                                        style: {
                                            animationDelay: `${i * 0.2}s`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 572,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 570,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 543,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 540,
                columnNumber: 11
            }, this),
            showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[120] flex items-center justify-center p-6 sm:p-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-950/40 backdrop-blur-sm animate-fade-in",
                        onClick: ()=>setShowWarning(false)
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 584,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative glass-card bg-white p-8 rounded-[40px] shadow-3xl max-w-sm w-full text-center space-y-6 animate-slide-up border border-orange-500/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto text-orange-600 border border-orange-500/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-10 w-10 animate-pulse",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 589,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 588,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 587,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-orange-950 tracking-tight",
                                        children: "Pilih Bahasa Dulu"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 594,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-orange-900/60 leading-relaxed",
                                        children: [
                                            "Mode ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-orange-600 font-semibold",
                                                children: "Perempuan"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 596,
                                                columnNumber: 24
                                            }, this),
                                            " memerlukan pilihan bahasa agar pelafalan sesuai."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 595,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 593,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowWarning(false),
                                className: "w-full py-4 bg-orange-600 text-white rounded-2xl font-semibold text-xs uppercase tracking-widest hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all shadow-lg",
                                children: "Mengerti"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 600,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 586,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 583,
                columnNumber: 11
            }, this),
            showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[110] flex items-center justify-center p-6 sm:p-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-950/50 backdrop-blur-sm animate-fade-in",
                        onClick: ()=>setShowSuccess(false)
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 615,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative glass-card bg-white p-8 rounded-[40px] shadow-3xl max-w-sm w-full text-center space-y-6 animate-slide-up border border-green-500/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-10 w-10 animate-bounce",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 3,
                                        d: "M5 13l4 4L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 620,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 619,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 618,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-orange-950 tracking-tight",
                                        children: "Selesai!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 625,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-orange-900/50",
                                        children: "Audio sudah siap diputar atau diunduh."
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 626,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 624,
                                columnNumber: 15
                            }, this),
                            isGuest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 text-left w-full mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowSuccess(false),
                                    className: "w-full py-4 bg-orange-600 text-white rounded-2xl font-semibold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl",
                                    children: "Lanjut (Tutup Popup)"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 631,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 630,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowSuccess(false);
                                    router.push("/my-conversions");
                                },
                                className: "w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl",
                                children: "Lihat di Alih Audio Saya"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 639,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 617,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 614,
                columnNumber: 11
            }, this),
            audioUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-slide-up group relative p-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 rounded-[44px] blur-xl opacity-20 opacity-40 group-hover:opacity-30 transition duration-500"
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 658,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative glass rounded-[32px] p-5 md:p-6 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px]"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 662,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex flex-col md:flex-row items-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 w-full space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xl font-bold text-orange-950 text-stone-100 tracking-tight leading-none",
                                                                children: "Audio Selesai"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 670,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[9px] font-medium text-orange-900/50 text-stone-500 tracking-[0.1em] uppercase",
                                                                        children: "Status: Siap Unduh"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                                        lineNumber: 671,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-1 rounded-full border bg-orange-500/5 text-orange-400 border-orange-500/20 text-[9px] font-semibold tracking-[0.1em] uppercase",
                                                        children: provider === 'puter-ai' ? 'OPENAI ONYX' : provider === 'huggingface' || provider === 'edge' ? 'MICROSOFT EDGE' : 'GOOGLE CLOUD'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 666,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white/60 bg-black/50 p-1.5 rounded-[20px] shadow-inner transition-colors duration-300",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                    controls: true,
                                                    src: audioUrl,
                                                    className: "w-full h-12 scale-[0.98] transition-transform",
                                                    children: "Browser Anda tidak mendukung elemen audio."
                                                }, audioUrl, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 679,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full md:w-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleDownload,
                                            className: "w-full md:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md transform hover:-rotate-1 active:scale-95 text-[10px] tracking-widest uppercase",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-5 w-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 3,
                                                        d: "M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 21
                                                }, this),
                                                "UNDUH MP3"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 687,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 686,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 664,
                                columnNumber: 15
                            }, this),
                            isGuest && savedAudioPath && (()=>{
                                const fullUrl = `${window.location.origin}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAssetUrl"])(savedAudioPath)}`;
                                const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t border-orange-200/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold text-orange-900/70 mb-2 uppercase tracking-widest",
                                            children: "KODE EMBED HTML (GUEST)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 706,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-black/5 p-3 rounded-xl border border-orange-200/50 flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    readOnly: true,
                                                    className: "w-full bg-transparent text-xs text-stone-600 outline-none resize-none",
                                                    rows: 3,
                                                    value: htmlSnippet
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>navigator.clipboard.writeText(htmlSnippet),
                                                    className: "w-full py-2 bg-orange-100/80 text-orange-700 rounded-lg text-xs font-semibold hover:bg-orange-200 transition",
                                                    children: "Copy Embed HTML"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 707,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 705,
                                    columnNumber: 19
                                }, this);
                            })()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 660,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 657,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TTSForm.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_s(TTSForm, "V0rLt2F0il3+s8jVI1KSxlxQy4E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TTSForm;
var _c;
__turbopack_context__.k.register(_c, "TTSForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/guest/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GuestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TTSForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TTSForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function GuestPage() {
    _s();
    const [conversions, setConversions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchConversions = ()=>{
        fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiUrl"])("/api/guest-conversions")).then((res)=>res.json()).then((data)=>{
            if (data.success) {
                setConversions(data.conversions);
            }
            setLoading(false);
        }).catch(()=>setLoading(false));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GuestPage.useEffect": ()=>{
            fetchConversions();
        }
    }["GuestPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#fffaf5] p-6 text-zinc-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex flex-col gap-2 border-b border-orange-200 pb-6 pt-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-extrabold tracking-tight text-orange-950",
                            children: "Mode Guest (Tanpa Login)"
                        }, void 0, false, {
                            fileName: "[project]/app/guest/page.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-orange-900/50",
                            children: "Silakan konversi text menjadi audio secara instan. Audio yang dihasilkan akan masuk ke daftar konversi publik."
                        }, void 0, false, {
                            fileName: "[project]/app/guest/page.tsx",
                            lineNumber: 32,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/guest/page.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "glass rounded-[40px] p-5 md:p-8 shadow-xl border border-orange-200/50 backdrop-blur-xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TTSForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isGuest: true,
                        onSuccess: fetchConversions
                    }, void 0, false, {
                        fileName: "[project]/app/guest/page.tsx",
                        lineNumber: 36,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/guest/page.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold tracking-tight",
                                    children: "Semua Konversi Guest"
                                }, void 0, false, {
                                    fileName: "[project]/app/guest/page.tsx",
                                    lineNumber: 41,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-zinc-500 uppercase tracking-widest mt-1",
                                    children: "Daftar audio yang pernah di-generate tanpa login"
                                }, void 0, false, {
                                    fileName: "[project]/app/guest/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/guest/page.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-[32px] p-6 shadow-lg border border-orange-200/50",
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center py-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/guest/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/guest/page.tsx",
                                lineNumber: 47,
                                columnNumber: 29
                            }, this) : conversions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12 text-zinc-400 font-medium",
                                children: "Belum ada konversi dari Guest."
                            }, void 0, false, {
                                fileName: "[project]/app/guest/page.tsx",
                                lineNumber: 51,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar",
                                children: conversions.map((conv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-2xl bg-white/40 border border-orange-200/30 hover:bg-white/60 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col md:flex-row gap-4 justify-between items-start md:items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-sm line-clamp-1",
                                                            children: conv.judul || "Tanpa Judul"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/guest/page.tsx",
                                                            lineNumber: 60,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-zinc-500 line-clamp-2 max-w-[400px]",
                                                            children: conv.text_input
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/guest/page.tsx",
                                                            lineNumber: 61,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2 text-[10px] uppercase font-semibold text-orange-600/60 tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: conv.provider
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/guest/page.tsx",
                                                                    lineNumber: 63,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/guest/page.tsx",
                                                                    lineNumber: 64,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: new Date(conv.created_at).toLocaleDateString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/guest/page.tsx",
                                                                    lineNumber: 65,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/guest/page.tsx",
                                                            lineNumber: 62,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/guest/page.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 45
                                                }, this),
                                                conv.audio_path && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0 w-full md:w-64",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                        controls: true,
                                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAssetUrl"])(conv.audio_path),
                                                        className: "w-full h-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/guest/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/guest/page.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/guest/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 41
                                        }, this)
                                    }, conv.id, false, {
                                        fileName: "[project]/app/guest/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/guest/page.tsx",
                                lineNumber: 55,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/guest/page.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/guest/page.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "text-center pb-12 pt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        className: "inline-block px-6 py-2 rounded-full border border-orange-200 text-orange-900/50 font-semibold text-xs transition-colors hover:bg-orange-50",
                        children: "← KEMBALI KE BERANDA"
                    }, void 0, false, {
                        fileName: "[project]/app/guest/page.tsx",
                        lineNumber: 82,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/guest/page.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/guest/page.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/guest/page.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(GuestPage, "bz0a5sO40zDEi9uQZTtR6tJh4SI=");
_c = GuestPage;
var _c;
__turbopack_context__.k.register(_c, "GuestPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ca187cfd._.js.map