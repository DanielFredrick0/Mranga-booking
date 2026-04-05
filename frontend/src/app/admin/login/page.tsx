import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[--line] bg-white p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Protected area</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Admin login</h1>
        <form action={loginAction} className="mt-8 grid gap-4">
          <input className={inputClass} name="email" type="email" placeholder="Admin email" />
          <input className={inputClass} name="password" type="password" placeholder="Password" />
          {params.error ? <p className="text-sm text-red-600">Invalid credentials. Please try again.</p> : null}
          <button type="submit" className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-2xl border border-[--line] px-4 py-3 text-sm outline-none focus:border-[--brand-green]";
