import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id: Number(id) } });
  if (!experience) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(experience);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const experience = await prisma.experience.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(experience);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.experience.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
