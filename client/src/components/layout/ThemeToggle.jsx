import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';

/** Icon-only: the sun or moon shows the mode a press switches to, and the label says so for screen readers and on hover. */
export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = isDark ? FiSun : FiMoon;

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-lg border border-border text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary ${className}`}
    >
      <Icon aria-hidden="true" className="text-[1.1rem]" />
    </button>
  );
}
