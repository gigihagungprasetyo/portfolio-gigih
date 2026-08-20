"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

type SkillFormData = {
  id?: number;
  name: string;
  category: string;
  iconUrl: string | null;
};

const EMPTY_FORM: SkillFormData = {
  name: "",
  category: "",
  iconUrl: null,
};

export default function SkillForm({ initialData }: { initialData?: SkillFormData }) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState<SkillFormData>(initialData || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof SkillFormData>(key: K, value: SkillFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(isEdit ? `/api/skills/${form.id}` : "/api/skills", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          iconUrl: form.iconUrl,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      router.push("/admin/skills");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan skill. Coba lagi.");
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Nama Skill</label>
        <input
          required
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Next.js"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
        <input
          required
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          placeholder="Frontend, Backend, Tools, dll"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploadField
        label="Icon (opsional)"
        value={form.iconUrl}
        onChange={(url) => updateField("iconUrl", url)}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Skill"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/skills")}
          className="rounded-md border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
