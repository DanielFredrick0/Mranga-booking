import Link from "next/link";

import { formatMoney } from "@/lib/utils";
import type { TourPackage } from "@/types";

export function TourCard({ tour }: { tour: TourPackage }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[--line] bg-white shadow-sm">
      <div className="h-60 bg-[--charcoal]">
        <img src={tour.featured_image} alt={tour.title} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          {tour.destinations.slice(0, 2).map((destination) => (
            <span key={destination.slug} className="rounded-full bg-[--sand] px-3 py-1 text-xs font-semibold text-[--brand-green]">
              {destination.name}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-serif text-2xl text-[--ink]">{tour.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[--muted]">{tour.short_description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[--muted]">
          <p>{tour.duration_days} days / {tour.duration_nights} nights</p>
          <p>{tour.private_or_shared}</p>
          <p>{tour.travel_style}</p>
          <p>{tour.accommodation_type}</p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[--muted]">From</p>
            <p className="text-xl font-semibold text-[--brand-green]">{formatMoney(tour.price_from, tour.currency)}</p>
          </div>
          <Link href={`/safaris/${tour.slug}`} className="rounded-full bg-[--brand-green] px-4 py-2 text-sm font-semibold text-white">
            View safari
          </Link>
        </div>
      </div>
    </article>
  );
}
