import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AchievementForm from "@/components/admin/AchievementForm";

export default async function EditAchievementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id: Number(id) } });

  if (!achievement) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Achievement</h1>
      <AchievementForm
        initialData={{
          id: achievement.id,
          title: achievement.title,
          issuer: achievement.issuer,
          year: achievement.year,
          credentialUrl: achievement.credentialUrl || "",
          image: achievement.image,
        }}
      />
    </div>
  );
}
