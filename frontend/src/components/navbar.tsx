import Link from "next/link";

import { company, navigation } from "@/lib/constants";
import { ButtonLink } from "@/components/button-link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(10,18,14,0.82)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="max-w-[220px] text-sm font-semibold uppercase tracking-[0.35em] text-white">
          {company.shortName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={`https://wa.me/${company.whatsappNumber}`} className="hidden text-sm text-[--brand-gold] sm:inline">
            WhatsApp
          </Link>
          <ButtonLink href="/quote" className="px-4 py-2">
            Get Free Quote
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
