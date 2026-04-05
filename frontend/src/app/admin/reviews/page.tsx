import { getAdminReviews } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Reviews</p>
        <h1 className="mt-3 font-serif text-4xl text-[--ink]">Testimonial management</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-[28px] border border-[--line] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[--ink]">{review.guest_name}</h2>
              <span className="rounded-full bg-[--sand] px-3 py-1 text-xs font-semibold text-[--brand-green]">{review.source}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[--muted]">{review.review_text}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-[--muted]">Use Django admin for full moderation controls and edits.</p>
    </div>
  );
}
