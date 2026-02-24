import { FileCard } from "@/components/FileCard";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AssetsExplorer() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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
        <>
            {/* Header */}
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-primary/20 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">menu</span>
                    <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">File Explorer</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary text-white">
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </button>
                </div>
            </header>

            {/* Tabs & Filters */}
            <div className="bg-background-light dark:bg-background-dark sticky top-[73px] z-10">
                <div className="flex border-b border-slate-200 dark:border-primary/10 px-4 gap-6">
                    <div className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-4">
                        <p className="text-sm font-bold">renpy-proyecto</p>
                    </div>
                    <div className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                        <p className="text-sm font-medium">Assets</p>
                    </div>
                    <div className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-4 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                        <p className="text-sm font-medium">Builds</p>
                    </div>
                </div>

                <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-primary/20 px-4 border border-slate-300 dark:border-primary/30">
                        <span className="material-symbols-outlined text-sm">image</span>
                        <p className="text-xs font-semibold">Images</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm">audio_file</span>
                        <p className="text-xs font-semibold">Audio</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm">code</span>
                        <p className="text-xs font-semibold">Scripts</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-sm">movie</span>
                        <p className="text-xs font-semibold">Videos</p>
                    </button>
                </div>
            </div>

            {/* File List */}
            <main className="flex-1 overflow-y-auto px-4 pb-28">
                <div className="flex flex-col gap-2">
                    {/* File Lists Rows */}
                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 rounded-xl p-3 border border-slate-100 dark:border-primary/10">
                        <div className="flex items-center justify-center rounded-lg bg-primary/20 text-primary shrink-0 size-12">
                            <span className="material-symbols-outlined text-2xl">description</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">script.rpy</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">12 KB • Modified 2h ago</p>
                        </div>
                        <button className="text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 rounded-xl p-3 border border-slate-100 dark:border-primary/10">
                        <div className="flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 shrink-0 size-12">
                            <span className="material-symbols-outlined text-2xl">image</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">background_main.png</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">2.4 MB • Modified 5h ago</p>
                        </div>
                        <button className="text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 rounded-xl p-3 border border-slate-100 dark:border-primary/10">
                        <div className="flex items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 shrink-0 size-12">
                            <span className="material-symbols-outlined text-2xl">music_note</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">theme_music.ogg</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">4.1 MB • Modified yesterday</p>
                        </div>
                        <button className="text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-primary/5 rounded-xl p-3 border border-slate-100 dark:border-primary/10">
                        <div className="flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 shrink-0 size-12">
                            <span className="material-symbols-outlined text-2xl">folder</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">images/sprites</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">24 files • Modified 1w ago</p>
                        </div>
                        <button className="text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Delete Modal Placeholder (Hidden by default in actual implementation) */}
            {/* 
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-primary/30">
          ...
        </div>
      </div>
      */}

            <Navbar />
        </>
    );
}
