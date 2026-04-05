import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { getDestination } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDestination(slug).catch(() => null);
  if (!data) {
    notFound();
  }

  const { destination, relatedTours } = data;

  return (
    <div>
      <section className="relative overflow-hidden bg-[--charcoal] py-24 text-white">
        <div className="absolute inset-0">
          <img src={destination.hero_image} alt={destination.name} className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Destination spotlight</p>
          <h1 className="mt-4 font-serif text-6xl">{destination.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">{destination.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/quote">Request a quote</ButtonLink>
            <ButtonLink href="/safaris" variant="secondary">
              Browse safaris
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-[28px] border border-[--line] bg-white p-6">
          <h2 className="font-serif text-3xl text-[--ink]">Best time to visit</h2>
          <p className="mt-4 text-sm leading-7 text-[--muted]">{destination.best_time_to_visit}</p>
        </div>
        <div className="rounded-[28px] border border-[--line] bg-white p-6">
          <h2 className="font-serif text-3xl text-[--ink]">Highlights</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-[--muted] sm:grid-cols-2">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Featured tours" title={`Safari ideas in ${destination.name}`} />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {relatedTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}
