import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EducationForm from "@/components/admin/EducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await prisma.education.findUnique({ where: { id: Number(id) } });

  if (!education) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Pendidikan</h1>
      <EducationForm
        initialData={{
          id: education.id,
          institution: education.institution,
          degree: education.degree,
          major: education.major,
          year: education.year,
          gpa: education.gpa != null ? String(education.gpa) : "",
          logo: education.logo,
          description: education.description || "",
        }}
      />
    </div>
  );
}
