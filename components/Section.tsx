/** Shared wrapper so every section has the same generous spacing and heading style. */
export default function Section({
  id,
  title,
  subtitle,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tinted ? "bg-primary-light" : "bg-white"}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 lg:py-24">
        <div className="text-center">
          <h2 id={`${id}-title`} className="text-2xl font-bold text-primary-dark sm:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-gray-700">{subtitle}</p>}
          <div className="mx-auto mt-4 h-1 w-14 rounded bg-accent" aria-hidden="true" />
        </div>
        <div className="mt-8 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
