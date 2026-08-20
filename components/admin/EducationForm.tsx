"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

type EducationFormData = {
  id?: number;
  institution: string;
  degree: string;
  major: string;
  year: string;
  gpa: string; // simpan sebagai string di form, dikonversi ke number saat submit
  logo: string | null;
  description: string;
};

const EMPTY_FORM: EducationFormData = {
  institution: "",
  degree: "",
  major: "",
  year: "",
  gpa: "",
  logo: null,
  description: "",
};

export default function EducationForm({ initialData }: { initialData?: EducationFormData }) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState<EducationFormData>(initialData || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof EducationFormData>(key: K, value: EducationFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      institution: form.institution,
      degree: form.degree,
      major: form.major,
      year: form.year,
      gpa: form.gpa ? Number(form.gpa) : null,
      logo: form.logo,
      description: form.description,
    };

    try {
      const res = await fetch(isEdit ? `/api/educations/${form.id}` : "/api/educations", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      router.push("/admin/educations");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan riwayat pendidikan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Institusi</label>
        <input
          required
          value={form.institution}
          onChange={(e) => updateField("institution", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Jenjang</label>
          <input
            required
            value={form.degree}
            onChange={(e) => updateField("degree", e.target.value)}
            placeholder="S1, SMA, dll"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Jurusan</label>
          <input
            required
            value={form.major}
            onChange={(e) => updateField("major", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
          <input
            required
            value={form.year}
            onChange={(e) => updateField("year", e.target.value)}
            placeholder="2021 - 2025"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">GPA (opsional)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={form.gpa}
            onChange={(e) => updateField("gpa", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi (opsional)</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploadField
        label="Logo Institusi"
        value={form.logo}
        onChange={(url) => updateField("logo", url)}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Pendidikan"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/educations")}
          className="rounded-md border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
