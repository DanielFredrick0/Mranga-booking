import { company } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent("Hello Mranga Tours, I would like help planning a safari.")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-30 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg"
    >
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      WhatsApp
    </a>
  );
}
