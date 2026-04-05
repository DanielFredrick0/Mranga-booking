import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { company, navigation } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[--charcoal] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/10 bg-[#192316] p-8 shadow-[0_24px_60px_rgba(11,18,11,0.24)] lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
            <div className="space-y-5">
              <BrandLogo />
              <p className="max-w-xl text-sm leading-7 text-white/75">
                Tailor-made Kenya safaris, beach extensions, and dependable planning support designed by a coast-based team that knows how to turn inquiry into a smooth, memorable journey.
              </p>
              <div className="space-y-1 text-sm text-white/75">
                <p>{company.office}</p>
                <p>{company.email}</p>
                <p>{company.phone}</p>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full bg-[--brand-gold] px-5 py-3 text-sm font-semibold text-[--charcoal] transition hover:bg-[--brand-gold-soft]"
              >
                Start my safari plan
              </Link>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[--brand-gold-soft]">Explore</p>
              <div className="space-y-3 text-sm text-white/75">
                {navigation.map((item) => (
                  <div key={item.href}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[--brand-gold-soft]">Connect</p>
              <div className="space-y-3 text-sm text-white/75">
                {company.socialLinks.map((link) => (
                  <div key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[24px] border border-white/10 bg-[#11180f] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold-soft]">Response standard</p>
                <p className="mt-3 text-sm leading-7 text-white/75">{company.responsePromise}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 px-1 text-xs uppercase tracking-[0.26em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{company.name}</p>
          <p>Incredible wildlife safari.</p>
        </div>
      </div>
    </footer>
  );
}
