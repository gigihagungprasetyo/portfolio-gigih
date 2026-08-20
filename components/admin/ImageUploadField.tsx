"use client";

import { useState } from "react";

type Props = {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
};

export default function ImageUploadField({ label, value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      console.error(err);
      setError("Gagal upload foto. Coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>

      {value && (
        <div className="mb-2 relative w-40 h-28 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1 right-1 bg-white/90 text-slate-600 text-xs rounded px-1.5 py-0.5 hover:bg-red-50 hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-slate-200"
      />
      {uploading && <p className="text-xs text-slate-400 mt-1">Mengunggah...</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
