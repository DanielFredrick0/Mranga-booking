"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { resendQuoteCode, verifyQuote } from "@/lib/api";

export function VerifyForm({ quoteId, email }: { quoteId: number; email: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [resending, startResend] = useTransition();

  return (
    <div className="rounded-[32px] border border-[--line] bg-white p-8 shadow-lg">
      <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Step 3</p>
      <h1 className="mt-3 font-serif text-4xl text-[--ink]">Verify your email</h1>
      <p className="mt-4 text-sm leading-7 text-[--muted]">
        We sent a 4-digit verification code to <span className="font-semibold text-[--ink]">{email}</span>. Enter it below to confirm your safari request.
      </p>
      <input
        value={code}
        onChange={(event) => setCode(event.target.value)}
        maxLength={4}
        placeholder="0000"
        className="mt-6 w-full rounded-[24px] border border-[--line] px-5 py-4 text-center text-3xl tracking-[0.6em] outline-none focus:border-[--brand-green]"
      />
      {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              try {
                await verifyQuote({ quote_id: quoteId, code });
                router.push(`/quote/success?quoteId=${quoteId}`);
              } catch {
                setMessage("That code didn't work. Please try again.");
              }
            })
          }
          className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Verifying..." : "Verify inquiry"}
        </button>
        <button
          type="button"
          disabled={resending}
          onClick={() =>
            startResend(async () => {
              try {
                const response = await resendQuoteCode({ quote_id: quoteId });
                setMessage(response.message);
              } catch {
                setMessage("We couldn't resend the code right now.");
              }
            })
          }
          className="rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
}
