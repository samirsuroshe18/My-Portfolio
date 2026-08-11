export function EmptyState({ icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
      {icon && <div className="mb-1 text-4xl opacity-70">{icon}</div>}
      {title && <p className="text-base font-semibold text-text-primary">{title}</p>}
      {message && <p className="max-w-sm text-sm text-text-secondary">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
