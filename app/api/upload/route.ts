import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

// POST /api/upload -> dipakai form admin untuk upload foto (thumbnail, logo, dll)
// Body: FormData dengan field "file"
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  const blob = await put(`portfolio/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  // blob.url inilah yang disimpan ke kolom image/logo/thumbnail di database
  return NextResponse.json({ url: blob.url });
}
