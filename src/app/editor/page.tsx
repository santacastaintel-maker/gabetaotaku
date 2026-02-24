"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScriptEditor() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState(`# Ren'Py Script Start\nlabel start:\n    "Welcome to the development cycle."\n    $ player_name = "Dev"\n    show eileen happy\n    e "You are now editing in the cloud with Supabase storage."\n    menu:\n        "Check Assets":\n            jump assets_list\n        "Continue Coding":\n            pass\n    return`);

    useEffect(() => {
        const hasAccess = localStorage.getItem("gabotaku_access") === "true";
        if (!hasAccess) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) return null;

    return (
        <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Header */}
            <div className="flex items-center bg-white/5 dark:bg-primary/5 backdrop-blur-md sticky top-0 z-40 p-4 border-b border-slate-200 dark:border-primary/20 justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-slate-600 dark:text-slate-300 flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className="flex flex-col">
                        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">script.rpy</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ren'Py Visual Novel Project</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex h-9 items-center justify-center px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                        Save
                    </button>
                </div>
            </div>

            {/* File Tabs */}
            <div className="bg-white/50 dark:bg-background-dark/50 z-30">
                <div className="flex border-b border-slate-200 dark:border-primary/10 px-4 gap-6 overflow-x-auto no-scrollbar">
                    <div className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-4 whitespace-nowrap">
                        <p className="text-sm font-bold tracking-tight">script.rpy</p>
                    </div>
                    <div className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 whitespace-nowrap cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        <p className="text-sm font-medium tracking-tight">options.rpy</p>
                    </div>
                    <div className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 whitespace-nowrap cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        <p className="text-sm font-medium tracking-tight">screens.rpy</p>
                    </div>
                </div>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 p-4 bg-background-light dark:bg-background-dark font-mono text-sm leading-relaxed overflow-y-auto">
                <div className="rounded-xl bg-slate-100 dark:bg-editor-bg p-4 border border-slate-200 dark:border-primary/10 shadow-inner h-full flex flex-col relative">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent resize-none outline-none text-slate-800 dark:text-slate-200 focus:ring-0 border-0 p-0"
                        spellCheck={false}
                    />
                </div>

                {/* Quick Action Floating Bar */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {["label", "show", "hide", "jump", "menu", "scene"].map((action) => (
                        <button key={action} className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-bold border border-primary/20 whitespace-nowrap hover:bg-primary/20 transition-colors">
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
