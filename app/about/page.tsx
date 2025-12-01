import React from "react";
import { supabase } from "@/lib/supabase";
import AboutHero from "@/components/about/AboutHero";
import Contact from "@/components/home/Contact";
import PersonalStory from "@/components/about/PersonalStory";
import SkillsExpertise from "@/components/about/SkillsExpertise";
import ExperienceTimeline, { ExperienceItem } from "@/components/about/ExperienceTimeline";
import EducationAchievements, { Education, Achievement } from "@/components/about/EducationAchievements";

async function getSkills() {
  const { data } = await supabase.from('skills').select('*');
  return data || [];
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

async function getExperiences() {
  const { data } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false });

  if (!data) return [];

  const formattedData: ExperienceItem[] = data.map((item) => {
    const isCurrent = item.is_current === true || item.is_current === 1;
    const start = formatDate(item.start_date);
    const end = isCurrent ? "Present" : formatDate(item.end_date);
    
    let techs: string[] = [];
    if (Array.isArray(item.technologies)) {
      techs = item.technologies;
    } else if (typeof item.technologies === "string") {
      try { techs = JSON.parse(item.technologies); } catch (e) { techs = []; }
    }

    return {
      id: item.id,
      role: item.role,
      company: item.company,
      logo: item.logo,
      period: `${start} - ${end}`,
      location: item.location,
      description: item.description,
      technologies: techs,
      isCurrent: isCurrent,
    };
  });
  return formattedData;
}

async function getEducations() {
  const { data } = await supabase
    .from('educations')
    .select('*')
    .order('year', { ascending: false });
  return data as Education[] || [];
}

async function getAchievements() {
  const { data } = await supabase
    .from('achievements')
    .select('*')
    .order('year', { ascending: false });
  return data as Achievement[] || [];
}

export default async function AboutPage() {
  const [skills, experiences, educations, achievements] = await Promise.all([
    getSkills(),
    getExperiences(),
    getEducations(),
    getAchievements()
  ]);

  return (
    <main className="bg-white min-h-screen">
        <AboutHero />
        <PersonalStory />
        <SkillsExpertise skills={skills} />
        <ExperienceTimeline experiences={experiences} />
        <EducationAchievements 
          educations={educations} 
          achievements={achievements} 
        />
        <Contact />
    </main>
  );
}