import { useTheme } from '../../context/ThemeContext.jsx';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-lg text-text-primary transition-all hover:scale-105 hover:bg-primary hover:text-white ${className}`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
