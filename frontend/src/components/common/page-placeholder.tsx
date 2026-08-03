interface PagePlaceholderProps {
  label: string;
}

/** Temporary stand-in rendered while a page's feature UI is unbuilt. */
export function PagePlaceholder({ label }: PagePlaceholderProps) {
  return (
    <section
      aria-label={label}
      className="grid min-h-96 flex-1 place-items-center rounded-xl border border-dashed"
    >
      <p className="text-sm text-muted-foreground">{label} coming soon</p>
    </section>
  );
}
