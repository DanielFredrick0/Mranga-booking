import { getAdminTours } from "@/lib/api";
import { formatMoney } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const tours = await getAdminTours();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Tours</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Safari inventory</h1>
      </div>
      <div className="overflow-hidden rounded-[28px] border border-[--line] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[--sand] text-[--muted]">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Style</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Price from</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-t border-[--line]">
                <td className="px-6 py-4 font-semibold text-[--ink]">{tour.title}</td>
                <td className="px-6 py-4 text-[--muted]">{tour.travel_style}</td>
                <td className="px-6 py-4 text-[--muted]">{tour.duration_days} days</td>
                <td className="px-6 py-4 text-[--muted]">{formatMoney(tour.price_from, tour.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-[--muted]">Use Django admin for full create, edit, and delete controls.</p>
    </div>
  );
}
