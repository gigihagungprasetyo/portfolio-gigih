import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma 7 memindahkan konfigurasi koneksi database dari schema.prisma
 * ke file ini. File ini HANYA dipakai oleh Prisma CLI (generate, db push,
 * migrate, studio, seed) — bukan oleh aplikasi Next.js saat runtime.
 *
 * Sengaja pakai DIRECT_URL (bukan pooled) di sini karena operasi CLI
 * seperti migrate/push butuh koneksi langsung ke database, bukan lewat
 * connection pooler.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
