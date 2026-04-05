import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { getTour } from "@/lib/api";
import { formatMoney } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SafariDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getTour(slug).catch(() => null);
  if (!data) {
    notFound();
  }

  const tour = data.package;

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[32px]">
            <img src={tour.featured_image} alt={tour.title} className="h-[420px] w-full object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(tour.gallery_images ?? []).slice(0, 4).map((image) => (
              <img key={image} src={image} alt={tour.title} className="h-48 w-full rounded-[24px] object-cover" />
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Safari overview</p>
            <h1 className="font-serif text-5xl text-[--ink]">{tour.title}</h1>
            <p className="text-lg leading-8 text-[--muted]">{tour.full_description}</p>
            <div className="grid gap-4 rounded-[28px] border border-[--line] bg-white p-6 sm:grid-cols-2">
              <Fact label="Duration" value={`${tour.duration_days} days / ${tour.duration_nights} nights`} />
              <Fact label="Style" value={tour.travel_style} />
              <Fact label="Travel format" value={tour.private_or_shared} />
              <Fact label="Accommodation" value={tour.accommodation_type} />
              <Fact label="Guest rating" value={`${data.reviewSummary.average_rating}/5 average`} />
              <Fact label="Destinations" value={tour.destinations.map((item) => item.name).join(", ")} />
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading eyebrow="Day by day" title="Itinerary" />
            {(tour.itinerary_json ?? []).map((item) => (
              <div key={item.day} className="rounded-[24px] border border-[--line] bg-white p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-[--brand-gold]">Day {item.day}</p>
                <h3 className="mt-2 font-serif text-2xl text-[--ink]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[--muted]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ListCard title="Inclusions" items={tour.inclusions ?? []} />
            <ListCard title="Exclusions" items={tour.exclusions ?? []} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[28px] border border-[--line] bg-white p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">From price</p>
            <p className="mt-2 text-4xl font-semibold text-[--brand-green]">{formatMoney(tour.price_from, tour.currency)}</p>
            <p className="mt-2 text-sm text-[--muted]">per person based on a sample itinerary</p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={`/quote?tour=${tour.slug}`}>Get Free Quote</ButtonLink>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Related tours" title="Guests also compare these journeys" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {data.relatedTours.map((tourItem) => (
            <TourCard key={tourItem.slug} tour={tourItem} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-[--muted]">{label}</p>
      <p className="mt-2 text-base font-semibold text-[--ink]">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[28px] border border-[--line] bg-white p-6">
      <h3 className="font-serif text-2xl text-[--ink]">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[--muted]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
