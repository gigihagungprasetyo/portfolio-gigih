"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  endpoint,
  confirmMessage,
}: {
  endpoint: string;
  confirmMessage: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(confirmMessage)) return;

    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data.");
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
