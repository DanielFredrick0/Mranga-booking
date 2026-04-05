type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[--brand-gold]">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight text-[--ink] sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-[--muted]">{description}</p> : null}
    </div>
  );
}
