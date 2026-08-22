import React from "react";
import Contact from "@/components/home/Contact";
import ProjectsHero from "@/components/project/ProjectsHero";
import FeaturedProject from "@/components/project/FeaturedProject";
import FilteredGallery from "@/components/project/FilteredGallery";
import { prisma } from "@/lib/prisma";
import { toProjectView } from "@/lib/mappers";

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: "desc" },
    });
    return projects.map(toProjectView);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProject = projects.find((p) => p.is_featured) || projects[0] || null;

  return (
    <main className="bg-white min-h-screen">
        <ProjectsHero />
        <FeaturedProject project={featuredProject} />
        <FilteredGallery projects={projects} />
        <Contact />
    </main>
  );
}
