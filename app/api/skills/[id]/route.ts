import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id: Number(id) } });
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(skill);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const skill = await prisma.skill.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(skill);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.skill.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
