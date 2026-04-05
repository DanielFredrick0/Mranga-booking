import { ButtonLink } from "@/components/button-link";
import { BrandLogo } from "@/components/brand-logo";
import { DestinationCard } from "@/components/destination-card";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { company } from "@/lib/constants";
import { getHomeData } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomeData();
  const journeyHighlights = [
    "Private safari design shaped around your dates, pace, and budget.",
    "Bush and beach combinations that feel smooth from arrival to departure.",
    "Fast WhatsApp support from a local team based on Kenya's coast.",
  ];
  const planningPillars = [
    {
      title: "Tailored itinerary design",
      description: "We shape each journey around the right parks, lodge style, and pacing for your group instead of forcing a template.",
    },
    {
      title: "Trusted local coordination",
      description: "From Diani to the Mara, we match reliable transport, responsive communication, and practical trip sequencing.",
    },
    {
      title: "Premium guest care",
      description: "Every inquiry is handled with quick follow-up, clear expectations, and hospitality that reflects the Mranga brand.",
    },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden border-b border-[--line] bg-[radial-gradient(circle_at_top_right,rgba(242,161,31,0.28),transparent_24%),linear-gradient(145deg,#1d2a16_0%,#20361d_46%,#f2e4c8_46%,#fbf6eb_100%)] text-white">
        <div className="absolute inset-0 bg-[url('/images/masai-mara.svg')] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[rgba(242,161,31,0.18)] blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[rgba(229,187,102,0.16)] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-8">
              <BrandLogo light className="sm:hidden" />
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[--brand-gold-soft]">
                Incredible wildlife safari
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] sm:text-6xl xl:text-7xl">
                  Premium Kenya safaris shaped by local knowledge and a stronger brand of hospitality.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/78">
                  Mranga Tours & Safaris blends iconic wildlife circuits, Indian Ocean beach stays, and responsive planning into one polished travel experience.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/quote">Plan my safari</ButtonLink>
                <ButtonLink href="/admin/login" variant="secondary" className="border-white/25 bg-white/5 text-white hover:bg-white/12">
                  Admin
                </ButtonLink>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {journeyHighlights.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.08)] px-5 py-4 text-sm leading-6 text-white/74 backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[36px] border border-white/12 bg-[linear-gradient(180deg,rgba(251,246,235,0.16),rgba(255,255,255,0.05))] p-5 shadow-[0_40px_100px_rgba(12,21,12,0.36)] backdrop-blur-xl">
                <div className="grid gap-4">
                  <div className="rounded-[28px] bg-[rgba(245,236,216,0.92)] p-6 text-[--ink]">
                    <p className="text-xs uppercase tracking-[0.32em] text-[--brand-gold]">Brand promise</p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-[--brand-green-dark]">
                      Designed for guests who want confidence before they book.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[--muted]">
                      We pair trusted route planning, lodge matching, and coast-based support so your first impression already feels premium.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {data.stats.map((stat) => (
                      <div key={stat.label} className="rounded-[28px] border border-white/10 bg-[rgba(20,27,18,0.52)] p-5">
                        <p className="text-xs uppercase tracking-[0.28em] text-[--brand-gold-soft]">{stat.label}</p>
                        <p className="mt-3 text-4xl font-semibold text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[36px] border border-[--line] bg-white/80 p-8 shadow-[0_28px_70px_rgba(29,36,25,0.08)] lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Why the brand works</p>
            <h2 className="font-serif text-4xl leading-tight text-[--brand-green-dark]">
              The site now speaks the same visual language as your logo.
            </h2>
            <p className="text-base leading-8 text-[--muted]">
              Forest greens, warm safari gold, and sand-toned surfaces create a more grounded and credible presentation for a travel company selling trust, beauty, and high-touch planning.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {planningPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[28px] border border-[--line] bg-[--cream] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">0{planningPillars.indexOf(pillar) + 1}</p>
                <h3 className="mt-4 font-serif text-2xl text-[--ink]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[--muted]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <SectionHeading
          eyebrow="Featured journeys"
          title="High-conviction safari packages that already feel curated"
          description="These featured journeys are presented with a stronger editorial look so guests immediately understand the quality, pacing, and value of each itinerary."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.featuredPackages.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(239,228,205,0.2),rgba(255,255,255,0.74))]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow="Planning advantage"
            title="A more professional body section built for trust, speed, and tailored safari sales"
            description="Instead of generic travel blocks, the homepage now speaks directly to the reasons guests inquire, compare options, and decide to message or request a quote."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "Visual branding that reflects the original logo rather than a generic template.",
              "Sharper hierarchy so hero, packages, and trust signals read clearly on first scroll.",
              "Admin access surfaced in the live interface for internal management convenience.",
              "Footer and CTA treatment aligned to a premium safari brand instead of a plain brochure.",
            ].map((item) => (
              <div key={item} className="rounded-[28px] border border-[--line] bg-white/85 p-6 text-sm leading-7 text-[--muted] shadow-[0_18px_40px_rgba(29,36,25,0.06)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Destinations"
          title="From iconic game country to warm Indian Ocean coastlines"
          description="The destination block stays content-rich, but now sits inside a calmer visual system that lets the cards and copy breathe."
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
            description="The review area is kept clean and credible so the social proof supports the premium positioning established in the hero."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#1a2c16_0%,#1f3d22_55%,#294c27_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold-soft]">WhatsApp planning</p>
            <h2 className="mt-2 font-serif text-4xl text-white sm:text-5xl">Need fast safari guidance from the Mranga team?</h2>
            <p className="mt-3 text-base leading-8 text-white/72">
              Reach out for itinerary advice, lodge ideas, pricing guidance, or a custom bush-and-beach proposal tailored to your dates.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/quote" className="bg-white text-[--brand-green] hover:bg-[--sand]">
              Build my custom quote
            </ButtonLink>
            <a
              href={`https://wa.me/${company.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
            >
              Chat on WhatsApp
            </a>
            <ButtonLink href="/admin/login" variant="ghost" className="border border-white/12 bg-white/5 text-white hover:bg-white/12">
              Admin login
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
