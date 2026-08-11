export function Spinner({ className = '' }) {
  return (
    <div className={`flex items-center justify-center py-10 ${className}`}>
      <span className="h-8 w-8 animate-spin rounded-full border-3 border-primary/25 border-t-primary" />
    </div>
  );
}
