import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SkillForm from "@/components/admin/SkillForm";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id: Number(id) } });

  if (!skill) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Skill</h1>
      <SkillForm
        initialData={{
          id: skill.id,
          name: skill.name,
          category: skill.category,
          iconUrl: skill.iconUrl,
        }}
      />
    </div>
  );
}
