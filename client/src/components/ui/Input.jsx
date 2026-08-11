import { cn } from '../../utils/classNames.js';

export function Field({ label, error, required, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-text-primary">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="text-xs text-text-secondary">{hint}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

const baseInputClasses =
  'w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary';

export function Input({ label, error, required, hint, className = '', ...rest }) {
  return (
    <Field label={label} error={error} required={required} hint={hint}>
      <input
        className={cn(baseInputClasses, error ? 'border-red-500' : 'border-border', className)}
        {...rest}
      />
    </Field>
  );
}

export function Textarea({ label, error, required, hint, className = '', rows = 4, ...rest }) {
  return (
    <Field label={label} error={error} required={required} hint={hint}>
      <textarea
        rows={rows}
        className={cn(baseInputClasses, 'resize-y', error ? 'border-red-500' : 'border-border', className)}
        {...rest}
      />
    </Field>
  );
}

export function Select({ label, error, required, hint, className = '', options = [], placeholder, ...rest }) {
  return (
    <Field label={label} error={error} required={required} hint={hint}>
      <select
        className={cn(baseInputClasses, 'cursor-pointer', error ? 'border-red-500' : 'border-border', className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Checkbox({ label, className = '', ...rest }) {
  return (
    <label className={cn('flex items-center gap-2 text-sm text-text-primary cursor-pointer', className)}>
      <input type="checkbox" className="h-4 w-4 rounded border-border accent-[var(--color-primary)]" {...rest} />
      {label}
    </label>
  );
}
