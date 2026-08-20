import { signOut } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/login" });
      }}
    >
      <button
        type="submit"
        className="w-full text-sm text-slate-500 hover:text-red-600 text-left px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
      >
        Keluar
      </button>
    </form>
  );
}
