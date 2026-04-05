import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
        status === "verified" && "bg-emerald-100 text-emerald-700",
        status === "unverified" && "bg-amber-100 text-amber-700",
        status === "booked" && "bg-sky-100 text-sky-700",
        status === "quote_sent" && "bg-indigo-100 text-indigo-700",
        !["verified", "unverified", "booked", "quote_sent"].includes(status) && "bg-stone-200 text-stone-700",
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
