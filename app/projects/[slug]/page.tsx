import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toProjectView } from "@/lib/mappers";
import ProjectDetailClient from "@/components/project/ProjectDetailClient";

export const dynamic = "force-dynamic";

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return null;
    return toProjectView(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

async function getRecommendations(currentSlug: string, currentCategory: string) {
  const allProjects = await prisma.project.findMany({
    where: { slug: { not: currentSlug } },
  });

  const currentCatNormalized = (currentCategory || "").toLowerCase().trim().replace(/-/g, " ");

  const related = allProjects.filter((p) => {
    const pCat = (p.category || "").toLowerCase().trim().replace(/-/g, " ");
    return pCat.includes(currentCatNormalized) || currentCatNormalized.includes(pCat);
  });

  return related.map(toProjectView);
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {

  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const recommendations = await getRecommendations(slug, project.category);

  return (
    <ProjectDetailClient
      project={project}
      recommendations={recommendations}
    />
  );
}
