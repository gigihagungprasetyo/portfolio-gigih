import React from "react";
import { prisma } from "@/lib/prisma";
import { toEducationView, toAchievementView } from "@/lib/mappers";
import AboutHero from "@/components/about/AboutHero";
import Contact from "@/components/home/Contact";
import PersonalStory from "@/components/about/PersonalStory";
import SkillsExpertise from "@/components/about/SkillsExpertise";
import ExperienceTimeline, { ExperienceItem } from "@/components/about/ExperienceTimeline";
import EducationAchievements, { Education, Achievement } from "@/components/about/EducationAchievements";

async function getSkills() {
  return prisma.skill.findMany();
}

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

async function getExperiences(): Promise<ExperienceItem[]> {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return experiences.map((item) => {
    const start = formatDate(item.startDate);
    const end = item.isCurrent ? "Present" : formatDate(item.endDate);

    return {
      id: item.id,
      role: item.role,
      company: item.company,
      logo: item.logo,
      period: `${start} - ${end}`,
      location: item.location,
      description: item.description,
      technologies: item.technologies,
      isCurrent: item.isCurrent,
    };
  });
}

async function getEducations(): Promise<Education[]> {
  const educations = await prisma.education.findMany({
    orderBy: { year: "desc" },
  });
  return educations.map(toEducationView) as Education[];
}

async function getAchievements(): Promise<Achievement[]> {
  const achievements = await prisma.achievement.findMany({
    orderBy: { year: "desc" },
  });
  return achievements.map(toAchievementView) as Achievement[];
}

export default async function AboutPage() {
  const [skills, experiences, educations, achievements] = await Promise.all([
    getSkills(),
    getExperiences(),
    getEducations(),
    getAchievements(),
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
