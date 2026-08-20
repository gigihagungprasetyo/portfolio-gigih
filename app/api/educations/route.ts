import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const educations = await prisma.education.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(educations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const education = await prisma.education.create({ data: body });
  return NextResponse.json(education, { status: 201 });
}
