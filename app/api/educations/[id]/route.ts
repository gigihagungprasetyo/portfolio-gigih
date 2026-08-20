import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const education = await prisma.education.findUnique({ where: { id: Number(id) } });
  if (!education) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(education);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const education = await prisma.education.update({
    where: { id: Number(id) },
    data: body,
  });
  return NextResponse.json(education);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.education.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
