import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800"
        >
          + Tambah Project
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Thumbnail</th>
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Tahun</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-3">
                  {project.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-14 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-14 h-10 rounded bg-slate-100" />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-900">{project.title}</td>
                <td className="px-4 py-3 text-slate-500">{project.category}</td>
                <td className="px-4 py-3 text-slate-500">{project.year}</td>
                <td className="px-4 py-3">
                  {project.isFeatured && (
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.id} title={project.title} />
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Belum ada project. Klik &quot;Tambah Project&quot; untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
