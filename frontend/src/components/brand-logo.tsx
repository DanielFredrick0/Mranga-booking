import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function BrandLogo({ className, compact = false, light = false }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/mranga-logo.svg"
        alt="Mranga Tours and Safaris Ltd."
        width={180}
        height={71}
        priority
        className={cn("h-12 w-auto rounded-2xl bg-[#f7f0df] p-1.5 shadow-[0_18px_40px_rgba(18,53,36,0.16)]", compact && "h-10")}
      />
      <span className="hidden min-w-0 sm:block">
        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[--brand-gold]">
          Kenya Safaris
        </span>
        <span className={cn("block font-serif text-xl leading-none", light ? "text-white" : "text-[--ink]")}>
          Mranga Tours
        </span>
        <span className={cn("mt-1 block text-xs leading-none", light ? "text-white/65" : "text-[--muted]")}>
          Tours & Safaris Ltd.
        </span>
      </span>
    </Link>
  );
}
