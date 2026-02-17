"use client";

import { useState } from "react";
import { getApiUrl } from "@/lib/utils";

interface LoginFormProps {
    onSuccess: (user: any) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(getApiUrl("/api/auth/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Username atau password salah.");
            }

            onSuccess(data.user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8 animate-slide-up">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-orange-950 dark:text-white">Selamat Datang</h2>
                <p className="text-orange-900/50 dark:text-zinc-400 font-medium">Silakan login dengan akun SSO BPS</p>
            </div>

            <div className="glass rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-2 px-1">
                            <label className="text-[10px] font-black text-orange-900/50 dark:text-zinc-400 tracking-[0.2em] uppercase">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="username.pegawai"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-6 py-4 bg-orange-50/50 dark:bg-black/40 border border-orange-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-orange-950 dark:text-white placeholder-orange-200 dark:placeholder-zinc-800 font-bold"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 px-1">
                            <label className="text-[10px] font-black text-orange-900/50 dark:text-zinc-400 tracking-[0.2em] uppercase">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-orange-50/50 dark:bg-black/40 border border-orange-100 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-orange-950 dark:text-white placeholder-orange-200 dark:placeholder-zinc-800 font-bold"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500 animate-in text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative overflow-hidden w-full py-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black shadow-xl shadow-orange-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    MENGOTENTIKASI...
                                </>
                            ) : (
                                <>Masuk Sekarang <span className="text-lg opacity-50">→</span></>
                            )}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20 group-hover:h-full transition-all duration-300"></div>
                    </button>
                </form>
            </div>

            <p className="text-center text-[10px] text-orange-900/40 dark:text-orange-950/60 font-black tracking-widest uppercase">
                KHUSUS INTERNAL PEGAWAI BPS
            </p>
        </div>
    );
}
