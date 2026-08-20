import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma 7 mewajibkan "driver adapter" untuk koneksi runtime (tidak bisa lagi
 * cuma taruh url di datasource seperti versi sebelumnya). Di sini kita pakai
 * DATABASE_URL (pooled) karena ini yang dipakai aplikasi saat serving request,
 * beda dari DIRECT_URL yang cuma dipakai Prisma CLI (lihat prisma.config.ts).
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
