import Link from "next/link";

import { getQuoteSummary } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function QuoteSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const quoteId = String(params.quoteId ?? "");
  const response = quoteId ? await getQuoteSummary(quoteId) : null;
  const quote = response?.quote;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[--line] bg-white p-8 shadow-lg sm:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Inquiry received</p>
        <h1 className="mt-3 font-serif text-5xl text-[--ink]">Thank you for choosing Mranga</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[--muted]">
          Your safari inquiry has been verified and is now with our planning team. Expect a tailored response within 30 minutes during business hours.
        </p>
        {quote ? (
          <div className="mt-8 grid gap-4 rounded-[28px] bg-[--sand] p-6 sm:grid-cols-2">
            <SummaryItem label="Guest" value={quote.fullName} />
            <SummaryItem label="Trip type" value={quote.tripType} />
            <SummaryItem label="Destinations" value={quote.destinationInterest.join(", ")} />
            <SummaryItem label="Travel month" value={quote.travelMonth || "Flexible"} />
            <SummaryItem label="Travelers" value={`${quote.adults} adults, ${quote.children} children`} />
            <SummaryItem label="Duration" value={`${quote.durationDays} days`} />
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
          <Link href="/safaris" className="inline-flex items-center justify-center rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]">
            Browse More Safaris
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-[--muted]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[--ink]">{value}</p>
    </div>
  );
}
