import { DestinationCard } from "@/components/destination-card";
import { SectionHeading } from "@/components/section-heading";
import { getDestinations } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const { results } = await getDestinations();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Kenya destinations"
        title="Explore wildlife regions, coast escapes, and seamless bush-to-beach combinations"
        description="Each destination page highlights the best travel windows, signature experiences, and relevant safari options."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {results.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </div>
  );
}
