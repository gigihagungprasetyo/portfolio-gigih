"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProjectButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Hapus project "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {loading ? "..." : "Hapus"}
    </button>
  );
}
