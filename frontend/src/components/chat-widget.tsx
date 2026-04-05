"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { company, quickReplies } from "@/lib/constants";

const cannedResponses: Record<string, string> = {
  "Safari Packages": "Our most requested trips are Masai Mara, Amboseli, and Tsavo combinations. I can guide you to the right safari collection.",
  "Bush + Beach": "Bush and beach journeys are one of our specialties. Start with Tsavo or the Mara, then finish in Diani for a premium coast break.",
  "Family Safari": "For families, we usually recommend private departures, flexible pacing, and lodge stays with child-friendly service.",
  Honeymoon: "For honeymooners, we lean toward luxury camps, scenic sundowners, and a Diani or Zanzibar-style beach finish.",
  "Request a Quote": "The fastest route is our guided quote flow. It captures travel style, dates, and budget so our team can respond with tailored options.",
  "Talk on WhatsApp": "You can move this conversation to WhatsApp any time for quicker planning support from our local team.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeReply, setActiveReply] = useState<string | null>(null);

  const message = useMemo(() => {
    if (!activeReply) {
      return "Welcome to Mranga Tours. Tell us what kind of Kenya trip you have in mind and we’ll point you in the right direction.";
    }
    return cannedResponses[activeReply];
  }, [activeReply]);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[340px] rounded-[28px] border border-[--line] bg-white p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Safari assistant</p>
              <h3 className="mt-1 font-serif text-2xl text-[--ink]">Plan with Mranga</h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[--sand] px-3 py-1 text-xs font-semibold text-[--brand-green]"
            >
              Close
            </button>
          </div>
          <div className="mt-4 rounded-[24px] bg-[--sand] p-4 text-sm leading-7 text-[--ink]">{message}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => setActiveReply(reply)}
                className="rounded-full border border-[--line] px-3 py-2 text-xs font-semibold text-[--ink] hover:bg-[--sand]"
              >
                {reply}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/quote" className="rounded-full bg-[--brand-green] px-4 py-3 text-center text-sm font-semibold text-white">
              Request a Quote
            </Link>
            <a
              href={`https://wa.me/${company.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[--line] px-4 py-3 text-center text-sm font-semibold text-[--ink]"
            >
              Talk on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white shadow-xl"
      >
        {open ? "Hide assistant" : "Chat with us"}
      </button>
    </div>
  );
}
