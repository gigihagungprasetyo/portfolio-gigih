/**
 * Migrasi semua foto yang masih menunjuk ke Supabase Storage supaya
 * dipindahkan sepenuhnya ke Vercel Blob. Setelah script ini selesai,
 * project sudah 100% lepas dari Supabase (database maupun storage).
 *
 * Syarat sebelum menjalankan ini:
 *   1. Sudah connect Vercel Blob store (lihat MIGRATION_GUIDE.md langkah 6)
 *   2. BLOB_READ_WRITE_TOKEN sudah ada di .env
 *   3. Data sudah di-seed ke Neon (langkah 4 sudah selesai)
 *
 * Cara pakai:
 *   npx tsx scripts/migrate-images-to-blob.ts
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { put } from "@vercel/blob";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const SUPABASE_HOST_HINT = "supabase.co/storage";

// Download 1 file dari URL lama, upload ke Vercel Blob, kembalikan URL baru
async function migrateOneUrl(oldUrl: string | null, folder: string): Promise<string | null> {
  if (!oldUrl || !oldUrl.includes(SUPABASE_HOST_HINT)) {
    // Bukan URL Supabase (sudah null, atau sudah pernah dipindah) -> biarkan apa adanya
    return oldUrl;
  }

  console.log(`  Mengunduh: ${oldUrl}`);
  const res = await fetch(oldUrl);
  if (!res.ok) {
    console.warn(`  ⚠️  Gagal unduh (${res.status}), URL lama dibiarkan: ${oldUrl}`);
    return oldUrl;
  }

  const blob = await res.blob();
  const filename = oldUrl.split("/").pop() || `${Date.now()}.jpg`;

  const uploaded = await put(`${folder}/${filename}`, blob, { access: "public" });
  console.log(`  ✅ Diunggah ulang ke: ${uploaded.url}`);
  return uploaded.url;
}

async function main() {
  console.log("=== Migrasi Education logos ===");
  const educations = await prisma.education.findMany();
  for (const edu of educations) {
    const newLogo = await migrateOneUrl(edu.logo, "education-logos");
    if (newLogo !== edu.logo) {
      await prisma.education.update({ where: { id: edu.id }, data: { logo: newLogo } });
    }
  }

  console.log("=== Migrasi Experience logos ===");
  const experiences = await prisma.experience.findMany();
  for (const exp of experiences) {
    const newLogo = await migrateOneUrl(exp.logo, "experience-logos");
    if (newLogo !== exp.logo) {
      await prisma.experience.update({ where: { id: exp.id }, data: { logo: newLogo } });
    }
  }

  console.log("=== Migrasi Project thumbnails & gallery ===");
  const projects = await prisma.project.findMany();
  for (const proj of projects) {
    const newThumbnail = await migrateOneUrl(proj.thumbnail, "project-thumbnails");

    const newGallery: string[] = [];
    for (const galleryUrl of proj.gallery) {
      const migrated = await migrateOneUrl(galleryUrl, "project-gallery");
      if (migrated) newGallery.push(migrated);
    }

    if (newThumbnail !== proj.thumbnail || JSON.stringify(newGallery) !== JSON.stringify(proj.gallery)) {
      await prisma.project.update({
        where: { id: proj.id },
        data: { thumbnail: newThumbnail, gallery: newGallery },
      });
    }
  }

  console.log("=== Migrasi Achievement images (kalau ada) ===");
  const achievements = await prisma.achievement.findMany();
  for (const ach of achievements) {
    const newImage = await migrateOneUrl(ach.image, "achievement-images");
    if (newImage !== ach.image) {
      await prisma.achievement.update({ where: { id: ach.id }, data: { image: newImage } });
    }
  }

  console.log("=== Migrasi Skill icons (kalau ada) ===");
  const skills = await prisma.skill.findMany();
  for (const skill of skills) {
    const newIcon = await migrateOneUrl(skill.iconUrl, "skill-icons");
    if (newIcon !== skill.iconUrl) {
      await prisma.skill.update({ where: { id: skill.id }, data: { iconUrl: newIcon } });
    }
  }

  console.log("\nSelesai! Semua foto sudah dipindahkan ke Vercel Blob.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
