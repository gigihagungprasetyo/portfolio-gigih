import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ExperienceForm from "@/components/admin/ExperienceForm";

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id: Number(id) } });

  if (!experience) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Pengalaman</h1>
      <ExperienceForm
        initialData={{
          id: experience.id,
          company: experience.company,
          role: experience.role,
          startDate: toDateInputValue(experience.startDate),
          endDate: toDateInputValue(experience.endDate),
          isCurrent: experience.isCurrent,
          location: experience.location || "",
          description: experience.description || "",
          technologies: experience.technologies,
          logo: experience.logo,
        }}
      />
    </div>
  );
}
