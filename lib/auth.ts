import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = (credentials?.email as string | undefined)?.trim();
        const password = (credentials?.password as string | undefined)?.trim();

        if (!email || !password) return null;

        // .trim() di sini penting: mencegah karakter tak terlihat
        // (spasi/enter nyasar dari .env) bikin perbandingan gagal.
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

        console.log("DEBUG email diketik:", JSON.stringify(email));
        console.log("DEBUG adminEmail dari env:", JSON.stringify(adminEmail));

        if (!adminEmail || !adminPasswordHash) return null;
        if (email.toLowerCase() !== adminEmail.toLowerCase()) {
          console.log("DEBUG: email tidak cocok");
          return null;
        }

        const valid = await bcrypt.compare(password, adminPasswordHash);
        console.log("DEBUG hasil bcrypt.compare:", valid);
        if (!valid) return null;

        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});