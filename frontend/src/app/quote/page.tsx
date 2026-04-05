import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Custom quote"
        title="Tell us about your trip and we’ll craft the right safari options"
        description="Your inquiry is saved immediately as unverified. We then send a 4-digit email code so you can confirm it and receive tailored recommendations."
      />
      <div className="mt-10">
        <QuoteForm />
      </div>
    </div>
  );
}
