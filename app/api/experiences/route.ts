import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const experience = await prisma.experience.create({ data: body });
  return NextResponse.json(experience, { status: 201 });
}
