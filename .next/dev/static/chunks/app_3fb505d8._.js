(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const LANGUAGES = [
    {
        code: "id-ID",
        name: "Bahasa Indonesia",
        flagCode: "id"
    },
    {
        code: "en-US",
        name: "English (US)",
        flagCode: "us"
    },
    {
        code: "ja-JP",
        name: "Japanese",
        flagCode: "jp"
    },
    {
        code: "ko-KR",
        name: "Korean",
        flagCode: "kr"
    },
    {
        code: "fr-FR",
        name: "French",
        flagCode: "fr"
    },
    {
        code: "de-DE",
        name: "German",
        flagCode: "de"
    },
    {
        code: "es-ES",
        name: "Spanish",
        flagCode: "es"
    },
    {
        code: "ru-RU",
        name: "Russian",
        flagCode: "ru"
    },
    {
        code: "ar-XA",
        name: "Arabic",
        flagCode: "sa"
    }
];
const EDGE_VOICES_MALE = [
    {
        code: "id-ID-ArdiNeural",
        name: "Bahasa Indonesia (Ardi)",
        flagCode: "id"
    },
    {
        code: "en-US-GuyNeural",
        name: "English US (Guy)",
        flagCode: "us"
    },
    {
        code: "en-GB-RyanNeural",
        name: "English UK (Ryan)",
        flagCode: "gb"
    },
    {
        code: "ja-JP-KeitaNeural",
        name: "Japanese (Keita)",
        flagCode: "jp"
    },
    {
        code: "ko-KR-InJoonNeural",
        name: "Korean (InJoon)",
        flagCode: "kr"
    },
    {
        code: "fr-FR-HenriNeural",
        name: "French (Henri)",
        flagCode: "fr"
    },
    {
        code: "de-DE-KilianNeural",
        name: "German (Kilian)",
        flagCode: "de"
    },
    {
        code: "es-ES-AlvaroNeural",
        name: "Spanish (Alvaro)",
        flagCode: "es"
    },
    {
        code: "ar-SA-HamedNeural",
        name: "Arabic (Hamed)",
        flagCode: "sa"
    }
];
const EDGE_VOICES_FEMALE = [
    {
        code: "id-ID-GadisNeural",
        name: "Bahasa Indonesia (Gadis)",
        flagCode: "id"
    },
    {
        code: "en-US-AriaNeural",
        name: "English US (Aria)",
        flagCode: "us"
    },
    {
        code: "en-GB-SoniaNeural",
        name: "English UK (Sonia)",
        flagCode: "gb"
    },
    {
        code: "ja-JP-NanamiNeural",
        name: "Japanese (Nanami)",
        flagCode: "jp"
    },
    {
        code: "ko-KR-SunHiNeural",
        name: "Korean (SunHi)",
        flagCode: "kr"
    },
    {
        code: "fr-FR-DeniseNeural",
        name: "French (Denise)",
        flagCode: "fr"
    },
    {
        code: "de-DE-AmalaNeural",
        name: "German (Amala)",
        flagCode: "de"
    },
    {
        code: "es-ES-ElviraNeural",
        name: "Spanish (Elvira)",
        flagCode: "es"
    },
    {
        code: "ar-SA-ZariyahNeural",
        name: "Arabic (Zariyah)",
        flagCode: "sa"
    }
];
const FEMALE_ENGINES = [
    {
        code: "edge",
        name: "Microsoft Edge TTS (Gratis)"
    },
    {
        code: "google",
        name: "Google Cloud (Banyak Bahasa)"
    }
];
const MALE_ENGINES = [
    {
        code: "huggingface",
        name: "Microsoft Edge TTS (Gratis)"
    },
    {
        code: "puter",
        name: "OpenAI (Puter.js)"
    }
];
const CustomSelect = ({ value, onChange, options, placeholder = "Pilih..." })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selected = options.find((o)=>o.code === value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onMouseDown: (e)=>{
                    e.preventDefault();
                    setIsOpen(!isOpen);
                },
                onBlur: ()=>setTimeout(()=>setIsOpen(false), 200),
                className: "w-full flex items-center justify-between px-5 py-4 bg-orange-50/80 border border-orange-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer shadow-sm text-left",
                style: {
                    color: '#7c2d12',
                    backgroundColor: 'rgba(255,237,213,0.85)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            selected?.flagCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `https://flagcdn.com/w20/${selected.flagCode}.png`,
                                alt: selected.flagCode,
                                className: "w-5 h-auto rounded-[2px] shadow-sm border border-black/10"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: selected ? selected.name : placeholder
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `text-orange-400 transition-transform ${isOpen ? 'rotate-180' : ''}`,
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
                                lineNumber: 89,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/app/components/TTSForm.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full mt-2 bg-white border border-orange-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto",
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.preventDefault();
                            onChange(opt.code);
                            setIsOpen(false);
                        },
                        className: `w-full flex items-center gap-3 px-5 py-3 text-sm text-left transition-colors ${value === opt.code ? 'bg-orange-50/80 text-orange-900 font-bold' : 'text-stone-700 hover:bg-orange-50 font-medium'}`,
                        children: [
                            opt.flagCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `https://flagcdn.com/w20/${opt.flagCode}.png`,
                                alt: opt.flagCode,
                                className: "w-5 h-auto rounded-[2px] shadow-sm border border-black/10"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 111,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            opt.name
                        ]
                    }, opt.code, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TTSForm.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomSelect, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = CustomSelect;
function TTSForm({ isGuest = false, onSuccess }) {
    _s1();
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
    const [copiedEmbed, setCopiedEmbed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                " Laki-laki"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/TTSForm.tsx",
                            lineNumber: 388,
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
                                    lineNumber: 406,
                                    columnNumber: 13
                                }, this),
                                " Perempuan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/TTSForm.tsx",
                            lineNumber: 398,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/TTSForm.tsx",
                    lineNumber: 387,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 386,
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
                                        lineNumber: 415,
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
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 414,
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
                                lineNumber: 420,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `grid grid-cols-1 lg:grid-cols-12 gap-4 transition-all duration-300 relative z-20`,
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
                                                                lineNumber: 437,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase whitespace-nowrap",
                                                                children: "Teks Sumber"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 17
                                                    }, this),
                                                    mode === 'puter' && maleEngine === 'puter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[8px] font-semibold bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full border border-orange-500/20 animate-fade-in uppercase tracking-wider text-orange-400",
                                                        children: "Auto-detect Bahasa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 435,
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
                                                        lineNumber: 448,
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
                                                        lineNumber: 450,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 446,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 457,
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
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-3 space-y-6 animate-fade-in relative z-20",
                                children: [
                                    mode === 'free' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-semibold text-orange-900/50 text-stone-500 tracking-[0.2em] uppercase px-1",
                                                children: "Engine Suara (Perempuan)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                    value: femaleEngine,
                                                    onChange: (v)=>setFemaleEngine(v),
                                                    options: FEMALE_ENGINES
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 476,
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
                                                        lineNumber: 486,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1 z-[11]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                            value: lang,
                                                            onChange: setLang,
                                                            options: LANGUAGES,
                                                            placeholder: "--- Pilih Bahasa ---"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 488,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 485,
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
                                                        lineNumber: 500,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1 z-[11]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                            value: edgeFemaleVoice,
                                                            onChange: setEdgeFemaleVoice,
                                                            options: EDGE_VOICES_FEMALE
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 502,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 499,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 474,
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
                                                lineNumber: 515,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative group z-[12]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                    value: maleEngine,
                                                    onChange: (v)=>setMaleEngine(v),
                                                    options: MALE_ENGINES
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 516,
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
                                                        lineNumber: 526,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative group mt-1 z-[11]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                            value: hfVoice,
                                                            onChange: setHfVoice,
                                                            options: EDGE_VOICES_MALE
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 525,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row items-center gap-4 justify-between border-t border-orange-100 pt-4 text-orange-900/50 text-stone-500 relative z-10",
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
                                        lineNumber: 543,
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
                                        lineNumber: 544,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 542,
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
                                                    lineNumber: 555,
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
                                                    lineNumber: 559,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 552,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 bottom-0 h-1 bg-black/10 group-hover:h-full transition-all duration-150"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 547,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 541,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 411,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-900/30 backdrop-blur-sm animate-fade-in"
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 571,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-16 h-16 mx-auto mb-4",
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
                                                lineNumber: 576,
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
                                                lineNumber: 581,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 575,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-orange-950 leading-none",
                                            children: [
                                                progress,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 591,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 590,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 574,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-stone-900",
                                children: "Sedang diproses..."
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 595,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-stone-500 mt-1 mb-6",
                                children: "Mohon tunggu, teks sedang dikonversi"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 596,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center gap-1.5 pb-2",
                                children: [
                                    ...Array(3)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce",
                                        style: {
                                            animationDelay: `${i * 0.2}s`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 600,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 598,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 573,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 570,
                columnNumber: 11
            }, this),
            showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[120] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-900/30 backdrop-blur-sm animate-fade-in",
                        onClick: ()=>setShowWarning(false)
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 612,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-600 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-6 w-6",
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
                                        lineNumber: 617,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 616,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 615,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-stone-900",
                                children: "Pilih Bahasa Dulu"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 621,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-stone-500 mt-1 mb-6",
                                children: [
                                    "Mode ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-600 font-semibold",
                                        children: "Perempuan"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 623,
                                        columnNumber: 22
                                    }, this),
                                    " memerlukan pilihan bahasa agar pelafalan sesuai."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 622,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowWarning(false),
                                className: "w-full py-2.5 bg-stone-100 text-stone-700 font-semibold text-sm rounded-xl hover:bg-stone-200 transition shadow-sm",
                                children: "Mengerti"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 626,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 614,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 611,
                columnNumber: 11
            }, this),
            showSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[110] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-stone-900/30 backdrop-blur-sm",
                        onClick: ()=>setShowSuccess(false)
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 640,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white p-6 rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/TTSForm.tsx",
                                    lineNumber: 644,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-stone-900",
                                children: "Audio Berhasil Dibuat"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-stone-500 mt-1 mb-6",
                                children: "Siap untuk diputar atau diunduh."
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 648,
                                columnNumber: 13
                            }, this),
                            isGuest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowSuccess(false),
                                        className: "w-full py-2.5 bg-green-50 text-green-700 font-semibold text-sm rounded-xl hover:bg-green-100 transition shadow-sm",
                                        children: "Tutup & Lihat Code Embed"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 652,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowSuccess(false);
                                            router.push("/guest/my-conversions");
                                        },
                                        className: "w-full py-2.5 bg-stone-100 text-stone-700 font-semibold text-sm rounded-xl hover:bg-stone-200 transition shadow-sm",
                                        children: "Buka Alih Audio Saya"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 658,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 651,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowSuccess(false);
                                    router.push("/my-conversions");
                                },
                                className: "w-full py-2.5 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition shadow-sm",
                                children: "Lihat di Daftar Audio"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 669,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 639,
                columnNumber: 9
            }, this),
            audioUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-slide-up group relative p-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700 rounded-[44px] blur-xl opacity-20 opacity-40 group-hover:opacity-30 transition duration-500"
                    }, void 0, false, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 687,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative glass rounded-[32px] p-5 md:p-6 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px]"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 691,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex flex-col gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold text-stone-100 tracking-tight leading-none",
                                                        children: "Audio Selesai"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 699,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] font-medium text-stone-500 tracking-[0.1em] uppercase",
                                                                children: "Status: Siap Unduh"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 py-1 rounded-full border bg-orange-500/5 text-orange-400 border-orange-500/20 text-[9px] font-semibold tracking-[0.1em] uppercase",
                                                children: provider === 'puter-ai' ? 'OPENAI ONYX' : provider === 'huggingface' || provider === 'edge' ? 'MICROSOFT EDGE' : 'GOOGLE CLOUD'
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 695,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/50 p-2 rounded-[24px] shadow-inner transition-colors duration-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                            controls: true,
                                            src: audioUrl,
                                            className: "w-full h-12 scale-[0.98] transition-transform",
                                            children: "Browser Anda tidak mendukung elemen audio."
                                        }, audioUrl, false, {
                                            fileName: "[project]/app/components/TTSForm.tsx",
                                            lineNumber: 710,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 709,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-3 w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleDownload,
                                                className: "w-full py-4 px-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md transform hover:-rotate-1 active:scale-95 text-[10px] md:text-xs tracking-widest uppercase",
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
                                                            lineNumber: 722,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/TTSForm.tsx",
                                                        lineNumber: 721,
                                                        columnNumber: 21
                                                    }, this),
                                                    "UNDUH MP3"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TTSForm.tsx",
                                                lineNumber: 717,
                                                columnNumber: 19
                                            }, this),
                                            isGuest && savedAudioPath && (()=>{
                                                const fullUrl = `${window.location.origin}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAssetUrl"])(savedAudioPath)}`;
                                                const htmlSnippet = `<div style="display: flex; align-items: center;"><span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><b>Berita Versi Audio</b></span><audio controls="" class="custom-audio" style="width: 150px; margin-left: 20px; font-family: Arial, Verdana; font-size: 10pt;"><source src="${fullUrl}" type="audio/mpeg"> </audio> </div>`;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        navigator.clipboard.writeText(htmlSnippet);
                                                        setCopiedEmbed(true);
                                                        setTimeout(()=>setCopiedEmbed(false), 2000);
                                                    },
                                                    className: `w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 ${copiedEmbed ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-blue-600/10'}`,
                                                    children: [
                                                        copiedEmbed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 40
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/TTSForm.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 72
                                                        }, this),
                                                        copiedEmbed ? 'Embed Tersalin!' : 'Salin HTML Backend'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/TTSForm.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 23
                                                }, this);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TTSForm.tsx",
                                        lineNumber: 716,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TTSForm.tsx",
                                lineNumber: 693,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TTSForm.tsx",
                        lineNumber: 689,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TTSForm.tsx",
                lineNumber: 686,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TTSForm.tsx",
        lineNumber: 384,
        columnNumber: 5
    }, this);
}
_s1(TTSForm, "fqRo3ewsuTtc+MvGrEryW3pjYEg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = TTSForm;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomSelect");
__turbopack_context__.k.register(_c1, "TTSForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(dashboard)/converter/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConverterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TTSForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TTSForm.tsx [app-client] (ecmascript)");
"use client";
;
;
function ConverterPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-orange-950 tracking-tighter uppercase",
                        children: "Alih Audio"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/converter/page.tsx",
                        lineNumber: 10,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-orange-900/50 text-xs font-medium uppercase tracking-widest mt-1",
                        children: "Konversi teks menjadi audio"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/converter/page.tsx",
                        lineNumber: 11,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/converter/page.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "glass rounded-[40px] p-5 md:p-8 shadow-2xl relative overflow-hidden border border-orange-200/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/converter/page.tsx",
                        lineNumber: 16,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TTSForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/(dashboard)/converter/page.tsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/converter/page.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "text-center py-4 opacity-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[8px] font-semibold tracking-widest text-zinc-400 uppercase",
                    children: "Platform Konversi Audio Internal BPS"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/converter/page.tsx",
                    lineNumber: 21,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/converter/page.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/converter/page.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = ConverterPage;
var _c;
__turbopack_context__.k.register(_c, "ConverterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_3fb505d8._.js.map