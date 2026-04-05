import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to our safari planners"
        description="Reach us by email, phone, WhatsApp, or use the quote flow for a tailored itinerary response."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 rounded-[28px] border border-[--line] bg-white p-8">
          <Info title="Office" value={company.office} />
          <Info title="Email" value={company.email} />
          <Info title="Phone" value={company.phone} />
          <Info title="WhatsApp" value={company.phone} />
          <div className="rounded-[24px] bg-[--sand] p-5 text-sm leading-7 text-[--muted]">
            Map placeholder: embed your Google Maps listing or office directions here.
          </div>
        </div>
        <form className="grid gap-4 rounded-[28px] border border-[--line] bg-white p-8">
          <input className={inputClass} placeholder="Full name" />
          <input className={inputClass} placeholder="Email address" type="email" />
          <input className={inputClass} placeholder="Phone / WhatsApp" />
          <textarea className={`${inputClass} min-h-32`} placeholder="Tell us about your ideal safari" />
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/quote">Open full quote flow</ButtonLink>
            <a
              href={`https://wa.me/${company.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[--line] px-5 py-3 text-sm font-semibold text-[--ink]"
            >
              Message on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[--brand-gold]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[--muted]">{value}</p>
    </div>
  );
}

const inputClass = "w-full rounded-2xl border border-[--line] px-4 py-3 text-sm outline-none focus:border-[--brand-green]";
