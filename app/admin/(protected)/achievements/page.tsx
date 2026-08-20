import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({ orderBy: { year: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800"
        >
          + Tambah Achievement
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Gambar</th>
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Penerbit</th>
              <th className="px-4 py-3 font-medium">Tahun</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {achievements.map((ach) => (
              <tr key={ach.id}>
                <td className="px-4 py-3">
                  {ach.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ach.image} alt={ach.title} className="w-10 h-10 object-cover rounded" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-slate-100" />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-900">{ach.title}</td>
                <td className="px-4 py-3 text-slate-500">{ach.issuer}</td>
                <td className="px-4 py-3 text-slate-500">{ach.year}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/achievements/${ach.id}/edit`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    endpoint={`/api/achievements/${ach.id}`}
                    confirmMessage={`Hapus achievement "${ach.title}"?`}
                  />
                </td>
              </tr>
            ))}

            {achievements.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data. Klik &quot;Tambah Achievement&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
