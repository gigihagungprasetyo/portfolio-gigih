import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Experiences</h1>
        <Link
          href="/admin/experiences/new"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800"
        >
          + Tambah Pengalaman
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Logo</th>
              <th className="px-4 py-3 font-medium">Perusahaan</th>
              <th className="px-4 py-3 font-medium">Posisi</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td className="px-4 py-3">
                  {exp.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-cover rounded" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-slate-100" />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-900">{exp.company}</td>
                <td className="px-4 py-3 text-slate-500">{exp.role}</td>
                <td className="px-4 py-3">
                  {exp.isCurrent && (
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                      Sekarang
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/experiences/${exp.id}/edit`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    endpoint={`/api/experiences/${exp.id}`}
                    confirmMessage={`Hapus pengalaman di "${exp.company}"?`}
                  />
                </td>
              </tr>
            ))}

            {experiences.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data. Klik &quot;Tambah Pengalaman&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
