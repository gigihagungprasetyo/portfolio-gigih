import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800"
        >
          + Tambah Skill
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td className="px-4 py-3">
                  {skill.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-100" />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-900">{skill.name}</td>
                <td className="px-4 py-3 text-slate-500">{skill.category}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/skills/${skill.id}/edit`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    endpoint={`/api/skills/${skill.id}`}
                    confirmMessage={`Hapus skill "${skill.name}"?`}
                  />
                </td>
              </tr>
            ))}

            {skills.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data. Klik &quot;Tambah Skill&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
