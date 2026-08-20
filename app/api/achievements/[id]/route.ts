import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({ where: { id: Number(id) } });
  if (!achievement) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(achievement);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const achievement = await prisma.achievement.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(achievement);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.achievement.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
