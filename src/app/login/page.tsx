"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [pin, setPin] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const SHARED_PIN = process.env.NEXT_PUBLIC_SHARED_PIN || "280404";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === SHARED_PIN) {
            localStorage.setItem("gabotaku_access", "true");
            router.push("/");
        } else {
            setErrorMsg("Código incorrecto. Pídele la clave a tu amigo.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-primary/30 p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary mb-4 shadow-inner">
                        <span className="material-symbols-outlined text-4xl">lock</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Acceso Privado</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Solo para el grupo de confianza</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Introduce el Código Secreto</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-primary dark:focus:border-primary transition-colors text-slate-900 dark:text-white"
                            placeholder="••••••"
                            maxLength={6}
                            required
                        />
                    </div>

                    {errorMsg && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm font-medium text-center">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 mt-2"
                    >
                        Entrar al Proyecto
                    </button>

                    <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">
                        Ren'Py Collaborator Studio
                    </p>
                </form>
            </div>
        </div>
    );
}
