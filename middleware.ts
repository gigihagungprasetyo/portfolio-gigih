import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAdminApi =
    req.nextUrl.pathname.startsWith("/api/") &&
    req.method !== "GET"; // GET publik (dipakai halaman portfolio), selain GET wajib login

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isAdminApi && !isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
