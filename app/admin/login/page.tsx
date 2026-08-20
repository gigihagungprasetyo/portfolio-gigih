import { loginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-slate-200 p-8"
      >
        <h1 className="text-xl font-semibold text-slate-900 mb-1">Admin Login</h1>
        <p className="text-sm text-slate-500 mb-6">Masuk untuk mengelola konten portfolio.</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
            Email atau password salah.
          </div>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full mb-4 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full mb-6 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 text-white text-sm font-medium py-2.5 hover:bg-slate-800"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
