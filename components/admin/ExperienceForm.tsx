"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

type ExperienceFormData = {
  id?: number;
  company: string;
  role: string;
  startDate: string; // yyyy-mm-dd, dari <input type="date">
  endDate: string; // yyyy-mm-dd, kosong kalau isCurrent
  isCurrent: boolean;
  location: string;
  description: string;
  technologies: string[];
  logo: string | null;
};

const EMPTY_FORM: ExperienceFormData = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  location: "",
  description: "",
  technologies: [],
  logo: null,
};

export default function ExperienceForm({ initialData }: { initialData?: ExperienceFormData }) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState<ExperienceFormData>(initialData || EMPTY_FORM);
  const [techInput, setTechInput] = useState((initialData?.technologies || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof ExperienceFormData>(key: K, value: ExperienceFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      company: form.company,
      role: form.role,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.isCurrent || !form.endDate ? null : new Date(form.endDate).toISOString(),
      isCurrent: form.isCurrent,
      location: form.location,
      description: form.description,
      technologies: techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      logo: form.logo,
    };

    try {
      const res = await fetch(isEdit ? `/api/experiences/${form.id}` : "/api/experiences", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      router.push("/admin/experiences");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan pengalaman kerja. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label>
          <input
            required
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Posisi/Role</label>
          <input
            required
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
        <input
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="Jakarta, Indonesia (Remote)"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mulai</label>
          <input
            type="date"
            required
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Selesai</label>
          <input
            type="date"
            disabled={form.isCurrent}
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.isCurrent}
          onChange={(e) => updateField("isCurrent", e.target.checked)}
        />
        Masih bekerja di sini sekarang
      </label>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Teknologi yang dipakai (pisahkan dengan koma)
        </label>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="Laravel, React, MySQL"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploadField
        label="Logo Perusahaan"
        value={form.logo}
        onChange={(url) => updateField("logo", url)}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Pengalaman"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experiences")}
          className="rounded-md border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
