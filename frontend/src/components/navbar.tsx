import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { company, navigation } from "@/lib/constants";
import { ButtonLink } from "@/components/button-link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(20,27,18,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo compact light />
        <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/admin/login" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-[--brand-gold]/50 hover:text-white sm:inline-flex">
            Admin
          </Link>
          <Link href={`https://wa.me/${company.whatsappNumber}`} className="hidden text-sm text-[--brand-gold] lg:inline">
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
