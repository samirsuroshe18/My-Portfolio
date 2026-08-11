export function TimelineList({ items, renderItem }) {
  return (
    <div className="relative flex flex-col gap-8 pl-8">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
      {items.map((item, index) => (
        <div key={item._id} className="relative">
          <span className="absolute -left-8 top-2 h-3.5 w-3.5 rounded-full border-2 border-primary bg-bg" />
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
