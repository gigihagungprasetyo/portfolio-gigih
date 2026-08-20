import { prisma } from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Contact from "@/components/home/Contact";
// 1. IMPORT TechMarquee DI SINI
import TechMarquee from "@/components/home/TechMarquee";

async function getHomepageProject() {
  try {
    const projects = await prisma.project.findMany({
      select: { id: true, title: true, slug: true, thumbnail: true },
      orderBy: [{ isFeatured: "desc" }, { id: "desc" }],
      take: 1,
    });
    return projects;
  } catch (error) {
    console.error("Error loading homepage project:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getHomepageProject();

  return (
    <main
      id="main-container"
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white"
    >

      <section className="h-screen w-full snap-start relative flex flex-col">
        <div className="grow">
            <Hero />
        </div>

        <div className="absolute bottom-0 w-full z-20">
           <TechMarquee />
        </div>
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
