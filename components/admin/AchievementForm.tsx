"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

type AchievementFormData = {
  id?: number;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  image: string | null;
};

const EMPTY_FORM: AchievementFormData = {
  title: "",
  issuer: "",
  year: "",
  credentialUrl: "",
  image: null,
};

export default function AchievementForm({ initialData }: { initialData?: AchievementFormData }) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState<AchievementFormData>(initialData || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof AchievementFormData>(key: K, value: AchievementFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(isEdit ? `/api/achievements/${form.id}` : "/api/achievements", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          issuer: form.issuer,
          year: form.year,
          credentialUrl: form.credentialUrl || null,
          image: form.image,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      router.push("/admin/achievements");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan achievement. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5">
      {error && (
        <div className="rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Judul Sertifikat</label>
        <input
          required
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Penerbit</label>
          <input
            required
            value={form.issuer}
            onChange={(e) => updateField("issuer", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
          <input
            required
            value={form.year}
            onChange={(e) => updateField("year", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Link Kredensial (opsional)
        </label>
        <input
          value={form.credentialUrl}
          onChange={(e) => updateField("credentialUrl", e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploadField
        label="Gambar Sertifikat (opsional)"
        value={form.image}
        onChange={(url) => updateField("image", url)}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Achievement"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/achievements")}
          className="rounded-md border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
