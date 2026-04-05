"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createQuote } from "@/lib/api";
import { destinationOptions } from "@/lib/constants";

const initialState = {
  destination_interest: ["Masai Mara"],
  trip_type: "Safari only",
  travel_month: "",
  travel_start: "",
  travel_end: "",
  adults: 2,
  children: 0,
  starting_location: "Nairobi",
  duration_days: 5,
  accommodation_level: "Mid-range",
  private_or_shared: "Private",
  budget_min: 1000,
  budget_max: 2500,
  full_name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

export function QuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(initialState);

  function update<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleDestination(name: string) {
    setForm((current) => ({
      ...current,
      destination_interest: current.destination_interest.includes(name)
        ? current.destination_interest.filter((item) => item !== name)
        : [...current.destination_interest, name],
    }));
  }

  function submitQuote() {
    setError("");
    startTransition(async () => {
      try {
        const response = await createQuote(form);
        router.push(`/quote/verify?quoteId=${response.quoteId}&email=${encodeURIComponent(response.email)}`);
      } catch {
        setError("We couldn't submit your inquiry just now. Please try again.");
      }
    });
  }

  return (
    <div className="rounded-[32px] border border-[--line] bg-white p-6 shadow-lg sm:p-8">
      <div className="mb-8 flex gap-3">
        {[1, 2, 3].map((value) => (
          <div key={value} className={`h-2 flex-1 rounded-full ${value <= step ? "bg-[--brand-green]" : "bg-[--sand]"}`} />
        ))}
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Step 1</p>
            <h2 className="mt-2 font-serif text-3xl text-[--ink]">Trip details</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {destinationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleDestination(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm ${
                  form.destination_interest.includes(option)
                    ? "border-[--brand-green] bg-[--brand-green] text-white"
                    : "border-[--line] bg-white text-[--ink]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Trip type">
              <select value={form.trip_type} onChange={(event) => update("trip_type", event.target.value)} className={inputClass}>
                <option>Safari only</option>
                <option>Beach only</option>
                <option>Bush + beach</option>
              </select>
            </Field>
            <Field label="Preferred travel month">
              <input value={form.travel_month} onChange={(event) => update("travel_month", event.target.value)} className={inputClass} placeholder="August 2026" />
            </Field>
            <Field label="Adults">
              <input type="number" min={1} value={form.adults} onChange={(event) => update("adults", Number(event.target.value))} className={inputClass} />
            </Field>
            <Field label="Children">
              <input type="number" min={0} value={form.children} onChange={(event) => update("children", Number(event.target.value))} className={inputClass} />
            </Field>
            <Field label="Starting location">
              <input value={form.starting_location} onChange={(event) => update("starting_location", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Trip duration">
              <input type="number" min={1} value={form.duration_days} onChange={(event) => update("duration_days", Number(event.target.value))} className={inputClass} />
            </Field>
            <Field label="Accommodation level">
              <select value={form.accommodation_level} onChange={(event) => update("accommodation_level", event.target.value)} className={inputClass}>
                <option>Comfort</option>
                <option>Mid-range</option>
                <option>Premium</option>
                <option>Luxury</option>
              </select>
            </Field>
            <Field label="Private or shared">
              <select value={form.private_or_shared} onChange={(event) => update("private_or_shared", event.target.value)} className={inputClass}>
                <option>Private</option>
                <option>Shared</option>
              </select>
            </Field>
            <Field label="Budget min">
              <input type="number" min={0} value={form.budget_min} onChange={(event) => update("budget_min", Number(event.target.value))} className={inputClass} />
            </Field>
            <Field label="Budget max">
              <input type="number" min={0} value={form.budget_max} onChange={(event) => update("budget_max", Number(event.target.value))} className={inputClass} />
            </Field>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => setStep(2)} className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white">
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[--brand-gold]">Step 2</p>
            <h2 className="mt-2 font-serif text-3xl text-[--ink]">Contact details</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input value={form.full_name} onChange={(event) => update("full_name", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Phone / WhatsApp">
              <input value={form.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Country">
              <input value={form.country} onChange={(event) => update("country", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Travel start">
              <input type="date" value={form.travel_start} onChange={(event) => update("travel_start", event.target.value)} className={inputClass} />
            </Field>
            <Field label="Travel end">
              <input type="date" value={form.travel_end} onChange={(event) => update("travel_end", event.target.value)} className={inputClass} />
            </Field>
          </div>
          <Field label="Special notes">
            <textarea value={form.message} onChange={(event) => update("message", event.target.value)} className={`${inputClass} min-h-28`} />
          </Field>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(1)} className="rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]">
              Back
            </button>
            <button
              type="button"
              onClick={submitQuote}
              disabled={pending}
              className="rounded-full bg-[--brand-green] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending ? "Sending..." : "Send Verification Code"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium text-[--ink]">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-[--line] bg-white px-4 py-3 text-sm text-[--ink] outline-none transition focus:border-[--brand-green]";
