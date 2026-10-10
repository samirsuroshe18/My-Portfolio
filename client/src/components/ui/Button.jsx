import { cn } from '../../utils/classNames.js';

const VARIANTS = {
  primary: 'bg-primary text-on-primary hover:brightness-110',
  secondary: 'border border-border text-text-primary hover:border-text-secondary',
  outline: 'border border-border text-text-primary hover:border-text-secondary',
  ghost: 'text-text-secondary hover:text-text-primary',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-[22px] py-3 text-base',
};

export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  loading = false,
  disabled = false,
  children,
  ...rest
}) {
  const Component = as;
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  return (
    <Component className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      {children}
    </Component>
  );
}
