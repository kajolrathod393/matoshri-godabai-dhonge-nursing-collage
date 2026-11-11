import { redirect } from "next/navigation";
import { isAdmin, isAuthConfigured } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20">
        <h1 className="text-2xl font-bold text-primary-dark">Admin is not set up yet</h1>
        <p className="mt-4 text-gray-700">
          Set <code>ADMIN_PASSWORD</code> and <code>AUTH_SECRET</code> (at least 32 characters) in
          your <code>.env</code> file, or in Vercel → Settings → Environment Variables, then restart.
        </p>
      </main>
    );
  }
  if (!(await isAdmin())) redirect("/admin/login");

  return <AdminDashboard dbConfigured={isDbConfigured()} />;
}
