import { StatusBadge } from "@/components/status-badge";
import { getAdminStats } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Dashboard</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Overview</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Tours", stats.tours],
          ["Destinations", stats.destinations],
          ["Reviews", stats.reviews],
          ["Leads", stats.leads],
          ["Verified leads", stats.verifiedLeads],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-[28px] border border-[--line] bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[--muted]">{label}</p>
            <p className="mt-2 text-4xl font-semibold text-[--brand-green]">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[28px] border border-[--line] bg-white p-6">
        <h2 className="font-serif text-3xl text-[--ink]">Recent inquiries</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-[--muted]">
              <tr>
                <th className="pb-3">Guest</th>
                <th className="pb-3">Trip</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-[--line]">
                  <td className="py-4">
                    <p className="font-semibold text-[--ink]">{lead.full_name}</p>
                    <p className="text-[--muted]">{lead.email}</p>
                  </td>
                  <td className="py-4 text-[--muted]">{lead.trip_type}</td>
                  <td className="py-4"><StatusBadge status={lead.status} /></td>
                  <td className="py-4 text-[--muted]">{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
