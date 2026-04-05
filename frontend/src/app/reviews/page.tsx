import { ButtonLink } from "@/components/button-link";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { getReviews } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const { results, summary } = await getReviews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Guest reviews"
        title={`Average guest rating: ${summary.average_rating}/5`}
        description={`Collected from ${summary.total_reviews} approved reviews across Google, TripAdvisor, and direct guests.`}
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {results.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="mt-10">
        <ButtonLink href="/quote">Request your safari quote</ButtonLink>
      </div>
    </div>
  );
}
