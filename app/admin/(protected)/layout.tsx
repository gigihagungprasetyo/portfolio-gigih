import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/experiences", label: "Experiences" },
    { href: "/admin/educations", label: "Educations" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/achievements", label: "Achievements" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 p-5 flex flex-col">
        <div className="text-sm font-semibold text-slate-900 mb-8">Portfolio Admin</div>
        <nav className="flex flex-col gap-1 grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
