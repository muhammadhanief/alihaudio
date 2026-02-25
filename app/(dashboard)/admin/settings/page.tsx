"use client";

import { useState, useEffect } from "react";
import { Settings2, Save, Users, Server, AlertTriangle } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

export default function AppSettingsPage() {
    const [guestAccess, setGuestAccess] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const fetchSettings = () => {
        setLoading(true);
        fetch(getApiUrl(`/api/settings?_t=${Date.now()}`), { headers: { 'Cache-Control': 'no-cache' } })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setGuestAccess(data.settings.guest_access);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const res = await fetch(getApiUrl("/api/admin/settings"), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guest_access: guestAccess }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSuccessMsg("Pengaturan berhasil disimpan.");
                setTimeout(() => setSuccessMsg(""), 3000);
            } else {
                setErrorMsg(data.error || "Gagal menyimpan pengaturan.");
            }
        } catch (e) {
            setErrorMsg("Terjadi kesalahan server");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-orange-950 tracking-tight uppercase flex items-center gap-3">
                    <Settings2 className="h-8 w-8 text-orange-600" /> Pengaturan Sistem
                </h1>
                <p className="text-orange-900/50 text-xs font-semibold uppercase tracking-widest mt-1">Konfigurasi Hak Akses & Platform (Khusus Superadmin)</p>
            </div>

            {loading ? (
                <div className="glass rounded-[32px] p-24 flex flex-col items-center justify-center gap-4 text-orange-600 border border-orange-200/50">
                    <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-[spin_0.8s_linear_infinite]"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-900/40 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                        Memuat Konfigurasi...
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {successMsg && (
                        <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-2xl flex items-center justify-center font-semibold text-sm animate-in fade-in slide-in-from-top-4">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-2xl flex items-center gap-2 font-semibold text-sm animate-in fade-in slide-in-from-top-4">
                            <AlertTriangle className="h-5 w-5" /> {errorMsg}
                        </div>
                    )}

                    <div className="glass rounded-[32px] p-6 md:p-8 border border-orange-200/50 shadow-sm space-y-8 relative overflow-hidden">

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-50 rounded-2xl text-red-500 shadow-inner max-w-max flex-shrink-0">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg text-orange-950">Akses Mode Tamu (Guest)</h3>
                                    <p className="text-sm text-orange-900/60 font-medium leading-relaxed max-w-xl">
                                        Izinkan pengguna masuk ke aplikasi tanpa menggunakan akun SSO.
                                        Jika dinonaktifkan, seluruh jalur ke mode tamu akan dihapus paksa secara instan.
                                    </p>
                                </div>
                            </div>

                            <label className="flex items-center cursor-pointer flex-shrink-0 bg-white/50 p-3 rounded-2xl border border-orange-100 shadow-sm ml-auto md:ml-0">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={guestAccess}
                                        onChange={() => setGuestAccess(!guestAccess)}
                                    />
                                    <div className={`block w-14 h-8 rounded-full transition-colors ${guestAccess ? 'bg-orange-500' : 'bg-zinc-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${guestAccess ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-sm font-bold uppercase tracking-widest min-w-[50px] text-center">
                                    {guestAccess ? (
                                        <span className="text-orange-600">Aktif</span>
                                    ) : (
                                        <span className="text-zinc-500">Mati</span>
                                    )}
                                </div>
                            </label>

                        </div>

                        <hr className="border-orange-100/50" />

                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="group relative px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-md flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    {saving ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            MENYIMPAN...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" /> SIMPAN PERUBAHAN
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-black/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform cursor-pointer"></div>
                            </button>
                        </div>
                    </div>

                    <div className="glass bg-zinc-900 rounded-[28px] p-6 text-white shadow-xl relative overflow-hidden group">
                        <Server className="absolute -right-8 -bottom-8 h-40 w-40 text-white/[0.03] transform -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex gap-4 relative z-10">
                            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-lg mb-1">Informasi Superadmin</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-medium">
                                    Perubahan yang Anda lakukan di halaman ini akan berlaku seketika (Real-Time) untuk semua sesi *browser* yang sedang aktif.
                                    Semua pengaturan di sini dicatat dan dilindungi secara ketat agar hanya Anda yang memiliki otoritas untuk mengaksesnya.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
