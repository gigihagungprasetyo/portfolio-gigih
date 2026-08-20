"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";
import ImageListUploadField from "./ImageListUploadField";

type ProjectFormData = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  thumbnail: string | null;
  gallery: string[];
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  isFeatured: boolean;
};

const EMPTY_FORM: ProjectFormData = {
  title: "",
  slug: "",
  category: "",
  year: "",
  description: "",
  challenge: "",
  solution: "",
  thumbnail: null,
  gallery: [],
  techStack: [],
  demoUrl: "",
  repoUrl: "",
  isFeatured: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ProjectForm({ initialData }: { initialData?: ProjectFormData }) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState<ProjectFormData>(initialData || EMPTY_FORM);
  const [techStackInput, setTechStackInput] = useState(
    (initialData?.techStack || []).join(", ")
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    updateField("title", value);
    if (!isEdit) {
      updateField("slug", slugify(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      techStack: techStackInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(isEdit ? `/api/projects/${form.id}` : "/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan project. Coba lagi.");
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Judul Project</label>
        <input
          required
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
        <input
          required
          value={form.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
          <input
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Challenge</label>
        <textarea
          rows={3}
          value={form.challenge}
          onChange={(e) => updateField("challenge", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Solution</label>
        <textarea
          rows={3}
          value={form.solution}
          onChange={(e) => updateField("solution", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploadField
        label="Thumbnail"
        value={form.thumbnail}
        onChange={(url) => updateField("thumbnail", url)}
      />

      <ImageListUploadField
        label="Galeri"
        values={form.gallery}
        onChange={(urls) => updateField("gallery", urls)}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tech Stack (pisahkan dengan koma)
        </label>
        <input
          value={techStackInput}
          onChange={(e) => setTechStackInput(e.target.value)}
          placeholder="Next.js, Prisma, Tailwind CSS"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Demo URL</label>
          <input
            value={form.demoUrl}
            onChange={(e) => updateField("demoUrl", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Repo URL</label>
          <input
            value={form.repoUrl}
            onChange={(e) => updateField("repoUrl", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => updateField("isFeatured", e.target.checked)}
        />
        Tampilkan sebagai Featured Project
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-md border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
