import { useTheme } from '../../context/ThemeContext.jsx';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`cursor-pointer whitespace-nowrap rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary ${className}`}
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
