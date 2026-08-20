"use client";

import { useState } from "react";

type Props = {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageListUploadField({ label, values, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) continue;
        const data = await res.json();
        uploadedUrls.push(data.url);
      }
      onChange([...values, ...uploadedUrls]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {values.map((url, i) => (
            <div key={i} className="relative w-24 h-20 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${label} ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-0.5 right-0.5 bg-white/90 text-slate-600 text-[10px] rounded px-1 py-0.5 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        disabled={uploading}
        className="block text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-slate-200"
      />
      {uploading && <p className="text-xs text-slate-400 mt-1">Mengunggah...</p>}
    </div>
  );
}
