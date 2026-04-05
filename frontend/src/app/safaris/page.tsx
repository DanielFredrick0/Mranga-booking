import { SectionHeading } from "@/components/section-heading";
import { TourCard } from "@/components/tour-card";
import { getDestinations, getTours } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function SafarisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  }

  const [{ results: tours }, { results: destinations }] = await Promise.all([getTours(query.toString()), getDestinations()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Safari collection"
        title="Browse Kenya safaris by destination, style, budget, and trip length"
        description="A SafariBookings-style discovery flow, tailored for Mranga's premium Kenya itineraries."
      />
      <form className="mt-10 grid gap-4 rounded-[28px] border border-[--line] bg-white p-6 lg:grid-cols-6">
        <FilterSelect name="destination" defaultValue={String(params.destination ?? "")}>
          <option value="">All destinations</option>
          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.name}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="tripType" defaultValue={String(params.tripType ?? "")}>
          <option value="">All trip types</option>
          <option value="Safari only">Safari only</option>
          <option value="Bush + beach">Bush + beach</option>
          <option value="Beach only">Beach only</option>
        </FilterSelect>
        <FilterSelect name="duration" defaultValue={String(params.duration ?? "")}>
          <option value="">Any duration</option>
          <option value="1-3">1-3 days</option>
          <option value="4-6">4-6 days</option>
          <option value="7+">7+ days</option>
        </FilterSelect>
        <FilterSelect name="budget" defaultValue={String(params.budget ?? "")}>
          <option value="">All budgets</option>
          <option value="budget">Budget-friendly</option>
          <option value="mid">Mid-range</option>
          <option value="premium">Premium</option>
        </FilterSelect>
        <FilterSelect name="privateOrShared" defaultValue={String(params.privateOrShared ?? "")}>
          <option value="">Private or shared</option>
          <option value="Private">Private</option>
          <option value="Shared">Shared</option>
        </FilterSelect>
        <div className="flex items-end gap-3">
          <FilterSelect name="sort" defaultValue={String(params.sort ?? "")}>
            <option value="">Featured</option>
            <option value="price_low">Price: low to high</option>
            <option value="price_high">Price: high to low</option>
            <option value="duration">Duration</option>
          </FilterSelect>
          <button type="submit" className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white">
            Apply
          </button>
        </div>
      </form>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
      </div>
    </div>
  );
}

function FilterSelect({
  children,
  defaultValue,
  name,
}: {
  children: React.ReactNode;
  defaultValue: string;
  name: string;
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-[--ink]">
      <span className="sr-only">{name}</span>
      <select name={name} defaultValue={defaultValue} className="w-full rounded-2xl border border-[--line] px-4 py-3">
        {children}
      </select>
    </label>
  );
}
