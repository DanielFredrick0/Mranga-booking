import Link from "next/link";

import { company, navigation } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[--line] bg-[--charcoal] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Mranga Tours & Safaris LTD</p>
          <p className="max-w-xl text-sm leading-7 text-white/75">
            Tailor-made Kenya safaris, premium bush-and-beach journeys, and responsive local planning support from a trusted coast-based team.
          </p>
          <div className="space-y-1 text-sm text-white/75">
            <p>{company.office}</p>
            <p>{company.email}</p>
            <p>{company.phone}</p>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold">Explore</p>
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
          <p className="mb-4 text-sm font-semibold">Connect</p>
          <div className="space-y-3 text-sm text-white/75">
            {company.socialLinks.map((link) => (
              <div key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
