export function SkillCard({ name, icon }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
      {icon && <img src={icon} alt={name} className="h-5 w-5 object-contain" loading="lazy" />}
      {name}
    </div>
  );
}
