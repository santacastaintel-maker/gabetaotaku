"use client";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';

type FileUploadZoneProps = {
    onUploadSuccess?: () => void;
};

export function FileUploadZone({ onUploadSuccess }: FileUploadZoneProps) {
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        if (!supabase) {
            alert("Configuración de Supabase faltante. No se pueden subir archivos.");
            return;
        }
        setUploading(true);

        try {
            const { data: userData } = await supabase.auth.getUser();
            const userId = userData.user?.id || 'anonymous';

            for (const file of acceptedFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
                const filePath = `${userId}/${fileName}`;

                const { error } = await supabase.storage
                    .from('renpy-proyecto')
                    .upload(filePath, file, { upsert: true });

                if (error) {
                    console.error("Error uploading file:", error);
                    alert(`Error subiendo ${file.name}: ${error.message}`);
                }
            }

            if (onUploadSuccess) onUploadSuccess();
            alert("¡Archivos subidos exitosamente!");
        } catch (err: any) {
            alert(err.message || "Error al subir archivos.");
        } finally {
            setUploading(false);
        }
    }, [onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className={`relative group ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`} {...getRootProps()}>
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary/30 to-vn-pink/30 rounded-xl blur transition duration-1000 ${isDragActive ? 'opacity-100' : 'opacity-25 group-hover:opacity-50'}`}></div>
            <div className={`relative flex flex-col items-center justify-center border-2 border-dashed bg-white dark:bg-slate-900/40 rounded-xl p-8 text-center transition-colors ${isDragActive ? 'border-primary dark:border-primary' : 'border-primary/30 dark:border-primary/20'}`}>
                <input {...getInputProps()} />
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
                </div>
                <h3 className="text-base font-bold mb-1">{uploading ? "Subiendo..." : "Upload Files"}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    {isDragActive ? "Drop the files here..." : "Drag Scripts (.rpy) or Assets (JPG, PNG, PSD, AI) to sync"}
                </p>
                <button disabled={uploading} className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors cursor-pointer pointer-events-none disabled:opacity-50">
                    Select Files
                </button>
            </div>
        </div>
    );
}
