import { getAdminDestinations } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const destinations = await getAdminDestinations();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Destinations</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Destination library</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {destinations.map((destination) => (
          <div key={destination.id} className="rounded-[28px] border border-[--line] bg-white p-6">
            <h2 className="font-serif text-2xl text-[--ink]">{destination.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[--muted]">{destination.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[--brand-gold]">{destination.best_time_to_visit}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-[--muted]">Use Django admin for full create, edit, and delete controls.</p>
    </div>
  );
}
