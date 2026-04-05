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
  const journeyHighlights = ["Private safari planning", "Bush and beach combinations", "Fast WhatsApp support"];
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
      <section className="border-b border-[--line] bg-[--charcoal] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-[--brand-gold]/25 bg-[--brand-gold]/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[--brand-gold-soft]">
                Trusted safari planning from Kenya&apos;s coast
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl font-serif text-5xl leading-[0.96] sm:text-6xl xl:text-7xl">
                  Kenya safari journeys designed with the strength and clarity of the Mranga brand.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/76">
                  Premium wildlife circuits, beach extensions, and dependable local coordination for travelers who want a serious safari company, not a generic booking page.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/quote" className="bg-[--brand-gold] text-[--charcoal] shadow-none hover:bg-[--brand-gold-soft]">
                  Request a quote
                </ButtonLink>
                <ButtonLink href="/safaris" variant="secondary" className="border-white/18 bg-transparent text-white hover:bg-white/8">
                  Explore safaris
                </ButtonLink>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {journeyHighlights.map((item) => (
                  <div key={item} className="rounded-[20px] border border-white/10 bg-[#1d2718] px-5 py-4 text-sm font-medium text-white/82">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5">
              <div className="rounded-[28px] bg-[--sand] p-6 text-[--ink]">
                <BrandLogo className="mb-6" />
                <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Why travelers choose Mranga</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-[--brand-green-dark]">
                  Clear planning, premium pacing, and a safari identity that feels established.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[--muted]">
                  Your logo already carries a strong safari personality. The homepage should do the same with cleaner structure, stronger contrast, and more confidence in the first screen.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="rounded-[24px] border border-white/10 bg-[#22311d] p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-[--brand-gold-soft]">{stat.label}</p>
                    <p className="mt-3 text-4xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[28px] border border-[--line] bg-white p-8 lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-[--brand-gold]">Brand direction</p>
            <h2 className="font-serif text-4xl leading-tight text-[--brand-green-dark]">
              Stronger, darker sections with a more professional safari presence.
            </h2>
            <p className="text-base leading-8 text-[--muted]">
              The page now leans on the logo&apos;s core palette instead of light overlays: forest green, safari gold, warm sand, and firm content blocks that feel deliberate.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {planningPillars.map((pillar, index) => (
              <div key={pillar.title} className="rounded-[28px] border border-[--line] bg-[--cream] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">0{index + 1}</p>
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

      <section className="bg-[--sand]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow="Planning advantage"
            title="Professional body sections built around trust, logistics, and conversion"
            description="This section now explains what makes Mranga credible in a direct, grounded way instead of relying on faded presentation."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              "A stronger first impression for premium safari and bush-to-beach inquiries.",
              "Cleaner visual hierarchy so trust signals read quickly on mobile and desktop.",
              "Dark-and-sand contrast that ties back to the logo's wildlife feel.",
              "More disciplined spacing and section rhythm across the homepage.",
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[--line] bg-white p-6 text-sm leading-7 text-[--muted]">
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
            description="Clean, readable social proof keeps the focus on real traveler confidence."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[--brand-green-dark]">
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
          </div>
        </div>
      </section>
    </div>
  );
}
