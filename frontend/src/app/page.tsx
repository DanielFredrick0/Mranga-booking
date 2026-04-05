import { ButtonLink } from "@/components/button-link";
import { DestinationCard } from "@/components/destination-card";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { getHomeData } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div>
      <section className="relative overflow-hidden bg-[--charcoal] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/masai-mara.svg"
            alt="Safari landscape"
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Premium Kenya journeys</p>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Discover Kenya with Local Safari Experts
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/80">
                Tailor-made safaris, beach holidays, and unforgettable bush-to-beach adventures with Mranga Tours & Safaris.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/quote">Get Free Quote</ButtonLink>
              <ButtonLink href="/safaris" variant="secondary">
                Browse Safaris
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            {data.stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] border border-white/10 bg-black/10 p-5">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured journeys"
          title="Conversion-focused safari packages for every style of traveler"
          description="Browse our most requested itineraries, each designed around local logistics, trusted accommodations, and responsive support."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.featuredPackages.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow="Why choose Mranga"
            title="A premium local team built around trust, speed, and tailored planning"
            description="We combine coast-based on-the-ground support, responsive quote turnaround, and carefully matched itineraries for families, couples, and groups."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "Local safari expertise with real Kenya trip-planning support",
              "Private and shared itineraries tailored to budget and style",
              "Bush + beach combinations designed for honeymoon and family travel",
              "Fast quote turnaround and WhatsApp-first support",
            ].map((item) => (
              <div key={item} className="rounded-[28px] border border-[--line] bg-[--cream] p-6 text-sm leading-7 text-[--muted]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Destinations"
          title="From big-game savannahs to warm Indian Ocean escapes"
          description="Choose a single destination or blend wildlife and coastline into one smooth itinerary."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <section className="bg-[--sand]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Guest reviews"
            title={`Trusted by travelers with an average rating of ${data.reviewSummary.average_rating}/5`}
            description="Real guest feedback from Google, TripAdvisor, and direct clients who booked their Kenya holidays with Mranga."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[--brand-green]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">WhatsApp planning</p>
            <h2 className="mt-2 font-serif text-4xl text-white">Need fast safari guidance?</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/quote" className="bg-white text-[--brand-green] hover:bg-[--sand]">
              Build my custom quote
            </ButtonLink>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
