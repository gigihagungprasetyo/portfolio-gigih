"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    // signIn() sukses juga "melempar" error internal (dipakai Next.js untuk
    // melakukan redirect). Kita cuma menangkap error asli dari Auth.js
    // (kredensial salah, dll) dan meneruskan sisanya apa adanya.
    if (error instanceof AuthError) {
      redirect("/admin/login?error=1");
    }
    throw error;
  }
}
