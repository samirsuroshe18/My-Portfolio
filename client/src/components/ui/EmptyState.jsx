export function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card px-6 py-8">
      {title && <p className="text-base font-semibold text-text-primary">{title}</p>}
      {message && <p className="max-w-sm text-sm text-text-secondary">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
