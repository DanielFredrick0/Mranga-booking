import { VerifyForm } from "@/components/verify-form";

export default async function QuoteVerifyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const quoteId = Number(params.quoteId ?? 0);
  const email = String(params.email ?? "");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <VerifyForm quoteId={quoteId} email={email} />
    </div>
  );
}
