import React from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProjectDetailClient from "@/components/project/ProjectDetailClient";

async function getProject(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error("Error fetching project:", error.message);
    return null;
  }
  return data;
}

async function getRecommendations(currentSlug: string, currentCategory: string) {
  const { data: allProjects } = await supabase
    .from('projects')
    .select('*')
    .neq('slug', currentSlug);

  if (!allProjects) return [];

  const currentCatNormalized = (currentCategory || "").toLowerCase().trim().replace(/-/g, ' ');

  const related = allProjects.filter((p) => {
    const pCat = (p.category || "").toLowerCase().trim().replace(/-/g, ' ');
    return pCat.includes(currentCatNormalized) || currentCatNormalized.includes(pCat);
  });

  return related;
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  console.log("Mencari project dengan slug:", slug);
  const project = await getProject(slug);

  if (!project) {
    console.log("Project tidak ditemukan di database.");
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