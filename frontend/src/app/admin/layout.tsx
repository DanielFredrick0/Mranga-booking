import Link from "next/link";

import { logoutAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/admin-auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Quote requests" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="rounded-[32px] border border-[--line] bg-[--charcoal] p-6 text-white">
        <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Mranga admin</p>
        <nav className="mt-8 space-y-3 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
          <a
            href="http://localhost:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Django admin
          </a>
        </nav>
        <form action={logoutAction} className="mt-8">
          <button type="submit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[--charcoal]">
            Sign out
          </button>
        </form>
      </aside>
      <div>{children}</div>
    </div>
  );
}
