import type {
  Project as PrismaProject,
  Achievement as PrismaAchievement,
  Education as PrismaEducation,
} from "@prisma/client";

/**
 * File ini menerjemahkan hasil query Prisma (field camelCase, misal
 * `techStack`, `credentialUrl`) balik ke bentuk snake_case (`tech_stack`,
 * `credential_url`) — persis seperti row mentah yang dulu dikembalikan
 * Supabase. Tujuannya supaya komponen-komponen React yang sudah ada
 * (FeaturedProject, FilteredGallery, ArchiveClient, dll) TIDAK perlu diubah
 * sama sekali.
 */

export type ProjectView = {
  id: number;
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string | null;
  challenge: string | null;
  solution: string | null;
  thumbnail: string | null;
  gallery: string[];
  tech_stack: string[];
  demo_url: string | null;
  repo_url: string | null;
  is_featured: boolean;
};

export function toProjectView(p: PrismaProject): ProjectView {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    year: p.year,
    description: p.description,
    challenge: p.challenge,
    solution: p.solution,
    thumbnail: p.thumbnail,
    gallery: p.gallery,
    tech_stack: p.techStack,
    demo_url: p.demoUrl,
    repo_url: p.repoUrl,
    is_featured: p.isFeatured,
  };
}

export type AchievementView = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  credential_url?: string | null;
  image: string | null;
};

export function toAchievementView(a: PrismaAchievement): AchievementView {
  return {
    id: a.id,
    title: a.title,
    issuer: a.issuer,
    year: a.year,
    credential_url: a.credentialUrl,
    image: a.image,
  };
}

export type EducationView = {
  id: number;
  institution: string;
  degree: string;
  major: string;
  year: string;
  gpa?: string;
  logo: string | null;
  description?: string | null;
};

export function toEducationView(e: PrismaEducation): EducationView {
  return {
    id: e.id,
    institution: e.institution,
    degree: e.degree,
    major: e.major,
    year: e.year,
    gpa: e.gpa != null ? String(e.gpa) : undefined,
    logo: e.logo,
    description: e.description,
  };
}
