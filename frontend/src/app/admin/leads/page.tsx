import { updateLeadStatusAction } from "@/app/admin/actions";
import { StatusBadge } from "@/components/status-badge";
import { getAdminLeads } from "@/lib/api";
import { leadStatuses } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getAdminLeads();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Quote requests</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Manage inquiries</h1>
      </div>
      <div className="overflow-x-auto rounded-[28px] border border-[--line] bg-white p-6">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[--muted]">
            <tr>
              <th className="pb-3">Guest</th>
              <th className="pb-3">Destinations</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Verified</th>
              <th className="pb-3">Created</th>
              <th className="pb-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-[--line] align-top">
                <td className="py-4">
                  <p className="font-semibold text-[--ink]">{lead.full_name}</p>
                  <p className="text-[--muted]">{lead.email}</p>
                  <p className="text-[--muted]">{lead.phone}</p>
                </td>
                <td className="py-4 text-[--muted]">{lead.destination_interest.join(", ")}</td>
                <td className="py-4"><StatusBadge status={lead.status} /></td>
                <td className="py-4 text-[--muted]">{lead.is_verified ? "Yes" : "No"}</td>
                <td className="py-4 text-[--muted]">{formatDate(lead.created_at)}</td>
                <td className="py-4">
                  <form action={updateLeadStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status} className="rounded-2xl border border-[--line] px-3 py-2">
                      {leadStatuses.map((statusValue) => (
                        <option key={statusValue} value={statusValue}>
                          {statusValue.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-full bg-[--brand-green] px-4 py-2 font-semibold text-white">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
