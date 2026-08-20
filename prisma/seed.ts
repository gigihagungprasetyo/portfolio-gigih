/**
 * Import data lama dari export CSV Supabase ke database Neon.
 * Jalankan sekali saja setelah `prisma migrate dev` / `prisma db push`.
 *
 * Cara pakai:
 *   npx tsx prisma/seed.ts
 *
 * Pastikan 5 file CSV ini ada di prisma/seed-data/:
 *   achievements_rows.csv, educations_rows.csv, experiences_rows.csv,
 *   projects_rows.csv, skills_rows.csv
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

// Seed dijalankan lewat Prisma CLI, yang membaca DIRECT_URL dari
// prisma.config.ts secara otomatis untuk urusan migrate/push. Tapi karena
// script ini menjalankan PrismaClient sendiri (bukan CLI generate/push),
// kita tetap perlu adapter + connection string secara eksplisit di sini.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});
const DATA_DIR = path.join(__dirname, "seed-data");

function readCsv(filename: string) {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];
}

// Helper: ubah string "NULL" / "" jadi null asli
function clean(value: string | undefined): string | null {
  if (value === undefined || value === "" || value === "NULL") return null;
  return value;
}

function cleanDate(value: string | undefined): Date | null {
  const v = clean(value);
  return v ? new Date(v) : null;
}

function cleanBool(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true";
}

// Parse kolom array JSON hasil export Supabase, contoh: ["Excel","Python"]
function cleanArray(value: string | undefined): string[] {
  const v = clean(value);
  if (!v) return [];
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed) ? parsed.map((s) => String(s).trim()) : [];
  } catch {
    return [];
  }
}

async function main() {
  console.log("Mengimpor achievements...");
  const achievements = readCsv("achievements_rows.csv");
  for (const row of achievements) {
    await prisma.achievement.upsert({
      where: { id: Number(row.id) },
      update: {},
      create: {
        id: Number(row.id),
        title: row.title,
        issuer: row.issuer,
        year: row.year,
        credentialUrl: clean(row.credential_url),
        image: clean(row.image),
        createdAt: cleanDate(row.created_at) ?? new Date(),
        updatedAt: cleanDate(row.updated_at) ?? new Date(),
      },
    });
  }

  console.log("Mengimpor educations...");
  const educations = readCsv("educations_rows.csv");
  for (const row of educations) {
    await prisma.education.upsert({
      where: { id: Number(row.id) },
      update: {},
      create: {
        id: Number(row.id),
        institution: row.institution,
        degree: row.degree,
        major: row.major,
        year: row.year,
        gpa: row.gpa ? Number(row.gpa) : null,
        logo: clean(row.logo),
        description: clean(row.description),
        createdAt: cleanDate(row.created_at) ?? new Date(),
        updatedAt: cleanDate(row.updated_at) ?? new Date(),
      },
    });
  }

  console.log("Mengimpor experiences...");
  const experiences = readCsv("experiences_rows.csv");
  for (const row of experiences) {
    await prisma.experience.upsert({
      where: { id: Number(row.id) },
      update: {},
      create: {
        id: Number(row.id),
        company: row.company,
        role: row.role,
        startDate: cleanDate(row.start_date),
        endDate: cleanDate(row.end_date),
        isCurrent: cleanBool(row.is_current),
        description: clean(row.description),
        technologies: cleanArray(row.technologies),
        logo: clean(row.logo),
        location: clean(row.location),
        createdAt: cleanDate(row.created_at) ?? new Date(),
        updatedAt: cleanDate(row.updated_at) ?? new Date(),
      },
    });
  }

  console.log("Mengimpor projects...");
  const projects = readCsv("projects_rows.csv");
  for (const row of projects) {
    await prisma.project.upsert({
      where: { id: Number(row.id) },
      update: {},
      create: {
        id: Number(row.id),
        title: row.title,
        slug: row.slug,
        category: row.category,
        year: row.year,
        description: clean(row.description),
        challenge: clean(row.challenge),
        solution: clean(row.solution),
        thumbnail: clean(row.thumbnail),
        gallery: cleanArray(row.gallery),
        techStack: cleanArray(row.tech_stack),
        demoUrl: clean(row.demo_url),
        repoUrl: clean(row.repo_url),
        isFeatured: cleanBool(row.is_featured),
        createdAt: cleanDate(row.created_at) ?? new Date(),
        updatedAt: cleanDate(row.updated_at) ?? new Date(),
      },
    });
  }

  console.log("Mengimpor skills...");
  const skills = readCsv("skills_rows.csv");
  for (const row of skills) {
    await prisma.skill.upsert({
      where: { id: Number(row.id) },
      update: {},
      create: {
        id: Number(row.id),
        name: row.name,
        category: row.category,
        iconUrl: clean(row.icon_url),
        createdAt: cleanDate(row.created_at) ?? new Date(),
        updatedAt: cleanDate(row.updated_at) ?? new Date(),
      },
    });
  }

  // Samakan auto-increment counter dengan id tertinggi yang baru diimpor,
  // supaya insert data baru dari admin panel tidak bentrok id.
  const tables = ["achievements", "educations", "experiences", "projects", "skills"];
  for (const t of tables) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${t}"', 'id'), COALESCE((SELECT MAX(id) FROM "${t}"), 1))`
    );
  }

  console.log("Selesai! Semua data lama sudah masuk ke Neon.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
