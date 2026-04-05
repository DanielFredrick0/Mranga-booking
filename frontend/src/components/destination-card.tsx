import Link from "next/link";

import type { Destination } from "@/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group overflow-hidden rounded-[28px] border border-[--line] bg-white shadow-sm transition hover:-translate-y-1"
    >
      <div className="h-64">
        <img src={destination.hero_image} alt={destination.name} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="font-serif text-2xl text-[--ink]">{destination.name}</h3>
        <p className="text-sm leading-6 text-[--muted]">{destination.description}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[--brand-gold]">Best time: {destination.best_time_to_visit}</p>
      </div>
    </Link>
  );
}
