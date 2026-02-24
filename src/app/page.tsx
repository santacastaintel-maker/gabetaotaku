"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileCard } from "@/components/FileCard";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificamos si tiene acceso por PIN
    const hasAccess = localStorage.getItem("gabotaku_access") === "true";
    if (!hasAccess) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("gabotaku_access");
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">Cargando...</div>;

  if (!supabase) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">¡Configuración Pendiente!</h2>
        <p className="text-slate-500 max-w-sm mb-6">
          Por favor, añade tu URL y ANON_KEY de Supabase en el archivo <code className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">.env.local</code> para activar el backend.
        </p>
        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 text-sm italic">
          Mientras tanto, puedes ver el diseño, pero las funciones de Auth y Storage están desactivadas.
        </div>
        <button
          onClick={() => router.refresh()}
          className="mt-8 bg-primary text-white px-6 py-2 rounded-lg font-bold"
        >
          Ya las puse, recargar
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Project Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Project: "Eternal Sakura"</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition">
          <span className="material-symbols-outlined text-xl">logout</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {/* Navigation Tabs */}
        <nav className="flex space-x-1 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm">
            Files
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Analytics
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Settings
          </button>
        </nav>

        {/* Upload Zone */}
        <section className="mb-8">
          <FileUploadZone onUploadSuccess={() => console.log('Refrescar lista...')} />
        </section>

        {/* File Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-vn-pink text-lg">history</span>
              Recent Scripts
            </h2>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FileCard
              filename="script.rpy"
              timeAgo="2 mins ago"
              category="Main"
              iconName="description"
              colorClass="vn-pink"
            />
            <FileCard
              filename="characters.rpy"
              timeAgo="1 hour ago"
              category="Assets"
              iconName="person"
              colorClass="vn-blue"
            />
            <FileCard
              filename="screens.rpy"
              timeAgo="Yesterday"
              category="UI"
              iconName="image"
              colorClass="vn-green"
            />
            <FileCard
              filename="options.rpy"
              timeAgo="3 days ago"
              category="Config"
              iconName="settings_suggest"
              colorClass="primary"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-8 mb-24">
          <h2 className="text-md font-bold mb-4">Project Stats</h2>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 flex justify-between items-center border border-primary/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">2.4k</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Lines</p>
            </div>
            <div className="w-px h-8 bg-primary/20"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Scenes</p>
            </div>
            <div className="w-px h-8 bg-primary/20"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">85%</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Storage</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Navbar */}
      <Navbar />
    </>
  );
}
