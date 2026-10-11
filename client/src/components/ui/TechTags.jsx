/** Technologies as small outlined tags, so they read as a skill list and not as another sentence. */
export function TechTags({ items, limit }) {
  if (!items?.length) return null;
  const shown = limit ? items.slice(0, limit) : items;

  return (
    <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li key={item} className="rounded-md border border-border px-2 py-0.5 text-[0.82rem] font-medium leading-snug text-text-secondary">
          {item}
        </li>
      ))}
    </ul>
  );
}
