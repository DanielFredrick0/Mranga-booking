import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/button-link";
import { company, navigation } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[--charcoal] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(242,161,31,0.18),rgba(18,53,36,0.12))] p-8 shadow-[0_28px_80px_rgba(11,18,11,0.26)] lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
            <div className="space-y-5">
              <BrandLogo light />
              <p className="max-w-xl text-sm leading-7 text-white/75">
                Tailor-made Kenya safaris, beach extensions, and dependable planning support designed by a coast-based team that knows how to turn inquiry into a smooth, memorable journey.
              </p>
              <div className="space-y-1 text-sm text-white/75">
                <p>{company.office}</p>
                <p>{company.email}</p>
                <p>{company.phone}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/quote" className="bg-white text-[--brand-green-dark] hover:bg-[--sand]">
                  Start my safari plan
                </ButtonLink>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[--brand-gold]/60 hover:bg-white/5"
                >
                  Admin access
                </Link>
              </div>
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
              <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
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
