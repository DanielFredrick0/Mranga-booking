import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-[--brand-green] text-white shadow-lg shadow-[--brand-green]/20 hover:bg-[--brand-green-dark]",
        variant === "secondary" && "border border-[--brand-gold]/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        variant === "ghost" && "border border-[--line] bg-white text-[--ink] hover:bg-[--sand]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
