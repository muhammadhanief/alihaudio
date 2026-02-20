"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/utils";

export default function LandingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(getApiUrl("/api/auth/session")).then(async res => {
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    });
  }, []);

  const features = [
    {
      title: "Suara Laki-laki (AI)",
      desc: "Menggunakan suara 'Onyx' dari OpenAI dengan hasil yang cukup natural untuk keperluan narasi.",
      icon: "🎙️",
      color: "from-orange-400 to-orange-600"
    },
    {
      title: "Suara Perempuan",
      desc: "Menggunakan Google Translate TTS — gratis dan cukup untuk kebutuhan sehari-hari.",
      icon: "👩",
      color: "from-amber-400 to-amber-600"
    },
    {
      title: "Teks Panjang",
      desc: "Teks panjang diproses secara otomatis per bagian sehingga tidak terpotong.",
      icon: "⚡",
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "Login SSO BPS",
      desc: "Menggunakan akun SSO BPS Jawa Tengah, tidak perlu daftar ulang.",
      icon: "🔒",
      color: "from-orange-600 to-orange-800"
    },
    {
      title: "Simpan & Unduh MP3",
      desc: "Hasil konversi tersimpan otomatis dan bisa diunduh kapan saja.",
      icon: "💾",
      color: "from-amber-500 to-amber-700"
    }
  ];

  return (
    <div className="relative min-h-screen selection:bg-orange-500/30 overflow-x-hidden">
      <div className="bg-mesh" />

      {/* Hero Section Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] animate-float" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      {/* Top Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 p-6 md:p-8 flex justify-center animate-fade-in">
        <div className="w-full max-w-6xl glass rounded-[24px] px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-600 shadow-lg shadow-orange-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter text-zinc-900 uppercase transition-colors">Alih Audio</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">


          <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            <span className="text-zinc-900 dark:text-white transition-colors">Teks ke </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-700">Audio.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Alat konversi teks ke audio untuk pegawai BPS. Cocok untuk membuat narasi berita atau konten publik.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => router.push(user ? "/dashboard" : "/login")}
              className="px-10 py-5 bg-orange-600 text-white rounded-[22px] font-black text-sm uppercase tracking-[0.1em] shadow-2xl shadow-orange-600/30 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3"
            >
              Mulai Konversi <span className="opacity-50 text-xl">→</span>
            </button>
            <a
              href="#features"
              className="px-10 py-5 bg-orange-100/50 dark:bg-white/5 text-orange-900 dark:text-white rounded-[22px] border border-orange-200 dark:border-white/10 font-black text-sm uppercase tracking-[0.1em] backdrop-blur-xl hover:bg-orange-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              Lihat Fitur
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">Fitur Utama Platform</h2>
            <div className="w-20 h-1.5 bg-orange-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass p-8 rounded-[40px] group hover:scale-[1.02] transition-all duration-500 flex flex-col items-start gap-6 border-transparent hover:border-orange-500/10"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl shadow-lg shadow-orange-500/10`}>
                  {f.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">{f.title}</h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed italic">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter mb-8 italic">
              Mulai Konversi <br className="md:hidden" /> Sekarang
            </h2>
            <button
              onClick={() => router.push(user ? "/dashboard" : "/login")}
              className="px-12 py-5 bg-zinc-900 text-white rounded-[22px] font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.05] active:scale-95 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-orange-200 dark:border-white/5 text-center">
        <p className="text-[10px] font-black tracking-[0.4em] text-orange-700 dark:text-orange-500 uppercase px-6">
          © 2026 Alih Audio BPS Jawa Tengah
        </p>
      </footer>
    </div>
  );
}
