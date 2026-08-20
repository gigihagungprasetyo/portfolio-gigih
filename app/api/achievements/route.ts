import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { year: "desc" },
  });
  return NextResponse.json(achievements);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const achievement = await prisma.achievement.create({ data: body });
  return NextResponse.json(achievement, { status: 201 });
}
