import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-6 pt-2 px-6 flex justify-between items-center z-20">
            <Link href="/" className="flex flex-col items-center gap-1 text-primary">
                <span className="material-symbols-outlined filled">dashboard</span>
                <span className="text-[10px] font-bold">Home</span>
            </Link>
            <Link href="/assets" className="flex flex-col items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined">folder</span>
                <span className="text-[10px] font-medium">Assets</span>
            </Link>

            <div className="relative -top-6">
                <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-white dark:border-background-dark transition-transform hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>

            <Link href="/insights" className="flex flex-col items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-[10px] font-medium">Insights</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-[10px] font-medium">Account</span>
            </Link>
        </nav>
    );
}
