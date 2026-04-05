import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/mranga-logo.jpeg"
        alt="Mranga Tours and Safaris Ltd."
        width={312}
        height={210}
        priority
        className={cn("h-16 w-auto rounded-2xl bg-[#f7f0df] p-1.5 shadow-[0_12px_24px_rgba(18,53,36,0.12)]", compact && "h-12")}
      />
    </Link>
  );
}
