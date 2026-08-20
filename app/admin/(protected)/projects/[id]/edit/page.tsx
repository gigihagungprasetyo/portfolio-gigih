import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });

  if (!project) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Project</h1>
      <ProjectForm
        initialData={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          category: project.category,
          year: project.year,
          description: project.description || "",
          challenge: project.challenge || "",
          solution: project.solution || "",
          thumbnail: project.thumbnail,
          gallery: project.gallery,
          techStack: project.techStack,
          demoUrl: project.demoUrl || "",
          repoUrl: project.repoUrl || "",
          isFeatured: project.isFeatured,
        }}
      />
    </div>
  );
}
