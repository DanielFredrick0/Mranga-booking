import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[28px] border border-[--line] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[--ink]">{review.guest_name}</h3>
          <p className="text-sm text-[--muted]">{review.guest_country}</p>
        </div>
        <span className="rounded-full bg-[--sand] px-3 py-1 text-xs font-semibold text-[--brand-green]">{review.source}</span>
      </div>
      <p className="mt-4 text-[--brand-gold]">{"★".repeat(review.rating)}</p>
      <p className="mt-3 text-sm leading-7 text-[--muted]">{review.review_text}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[--muted]">{formatDate(review.review_date)}</p>
    </article>
  );
}
