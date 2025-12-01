import React from "react";
import Contact from "@/components/home/Contact";
import ProjectsHero from "@/components/project/ProjectsHero";
import FeaturedProject from "@/components/project/FeaturedProject";
import FilteredGallery from "@/components/project/FilteredGallery";
import { supabase } from "@/lib/supabase";

async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProject = projects?.find((p) => p.is_featured === 1 || p.is_featured === true) || projects?.[0] || null;

  return (
    <main className="bg-white min-h-screen">
        <ProjectsHero />
        <FeaturedProject project={featuredProject} />
        <FilteredGallery projects={projects || []} />
        <Contact />
    </main>
  );
}