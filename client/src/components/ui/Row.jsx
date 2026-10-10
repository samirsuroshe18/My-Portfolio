/** One entry in a ruled list: a date (or other short label) on the left, the content on the right. */
export function Row({ meta, id, children }) {
  return (
    <article id={id} className="grid scroll-mt-24 gap-x-6 gap-y-1.5 border-t border-border py-7 sm:grid-cols-[190px_minmax(0,1fr)]">
      <div className="text-sm tabular-nums text-text-secondary sm:pt-1">{meta}</div>
      <div className="flex min-w-0 flex-col gap-2.5">{children}</div>
    </article>
  );
}
