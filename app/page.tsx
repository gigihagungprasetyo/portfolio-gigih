import { supabase } from "@/lib/supabase";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Contact from "@/components/home/Contact";

async function getHomepageProject() {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, thumbnail')
    .order('is_featured', { ascending: false })
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error loading homepage project:", error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const projects = await getHomepageProject();

  return (
    <main 
      id="main-container" 
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white"
    >
      
      <section className="h-screen w-full snap-start">
        <Hero />
      </section>

      <section className="h-screen w-full snap-start">
        <AboutPreview />
      </section>

      <section className="h-screen w-full snap-start">
        <ProjectsPreview projects={projects} />
      </section>

      <section className="h-screen w-full snap-start">
        <Contact />
      </section>

    </main>
  );
}