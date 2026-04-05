import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/constants";

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About Mranga"
        title="A coast-based safari company built around trust, speed, and tailored Kenya journeys"
        description="Mranga Tours & Safaris LTD plans premium wildlife and beach itineraries with strong local knowledge, responsive support, and guest-first service."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <InfoCard title="Office location" value={company.office} />
        <InfoCard title="Service areas" value="Masai Mara, Amboseli, Tsavo, Diani, Nairobi, and custom bush-to-beach combinations." />
        <InfoCard title="Response promise" value={company.responsePromise} />
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Mission and values"
          items={[
            "Design Kenya holidays that feel personal, polished, and easy to book.",
            "Offer honest trip advice that balances budget, comfort, and experience.",
            "Respond quickly and communicate clearly before, during, and after travel.",
          ]}
        />
        <Panel
          title="Why travel with Mranga"
          items={[
            "Local safari planners with practical ground knowledge",
            "Flexible private departures and premium tailor-made service",
            "Strong support for honeymoon, family, and beach extension travel",
          ]}
        />
      </div>
      <div className="mt-10 rounded-[32px] border border-[--line] bg-white p-8">
        <h2 className="font-serif text-3xl text-[--ink]">Team and trust indicators</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="Languages" value="English, Swahili, French support on request" />
          <InfoCard title="Response speed" value="Quote replies often within 30 minutes" />
          <InfoCard title="Trip styles" value="Safari only, beach escapes, bush + beach" />
          <InfoCard title="Support" value="WhatsApp-first guest communication" />
        </div>
      </div>
      <div className="mt-10">
        <ButtonLink href="/quote">Start your safari inquiry</ButtonLink>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-[--line] bg-white p-6">
      <p className="text-xs uppercase tracking-[0.25em] text-[--brand-gold]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[--muted]">{value}</p>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[28px] border border-[--line] bg-white p-8">
      <h2 className="font-serif text-3xl text-[--ink]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-[--muted]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
