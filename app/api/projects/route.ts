import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/projects -> publik, dipakai halaman portfolio
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST /api/projects -> hanya admin (dicek di middleware.ts)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = await prisma.project.create({ data: body });
  return NextResponse.json(project, { status: 201 });
}
