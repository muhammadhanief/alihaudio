"use client";

import TTSForm from "@/app/components/TTSForm";

export default function ConverterPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-orange-950 tracking-tighter uppercase">Alih Audio</h1>
                <p className="text-orange-900/50 text-xs font-bold uppercase tracking-widest mt-1">Konversi teks Anda menjadi suara berkualitas tinggi</p>
            </div>

            {/* Main Form Area */}
            <main className="glass rounded-[40px] p-5 md:p-8 shadow-2xl relative overflow-hidden border border-orange-200/50">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                <TTSForm />
            </main>

            <footer className="text-center py-4 opacity-40">
                <p className="text-[8px] font-black tracking-widest text-zinc-400 uppercase">
                    Platform Konversi Audio Internal BPS
                </p>
            </footer>
        </div>
    );
}
