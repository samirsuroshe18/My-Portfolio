import { FaGithub } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle.jsx';
import { Button } from '../ui/Button.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../utils/classNames.js';

const FALLBACK_NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Writing', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { data: settings } = usePortfolioData('siteSettings');
  const { data: profileData } = usePortfolioData('profile');

  const navItems = settings?.navItems?.length ? settings.navItems : FALLBACK_NAV_ITEMS;
  const activeId = useScrollSpy(navItems.map((item) => item.href.replace('#', '')));

  const logoText = settings?.logoText || 'Portfolio';
  const githubUrl = profileData?.profile?.githubUrl;
  const showGithubButton = settings?.showGithubButton !== false && githubUrl;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-7 gap-y-1 px-[clamp(16px,5vw,48px)] py-3">
        <a href="/#about" className="font-serif text-2xl leading-none text-text-primary">
          {logoText}
        </a>

        {/* on phones the links drop to their own line and scroll sideways */}
        <nav aria-label="Sections" className="order-3 min-w-0 basis-full overflow-x-auto sm:order-none sm:flex-1 sm:basis-auto">
          <ul className="flex w-max gap-1 sm:ml-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  aria-current={activeId === item.href.replace('#', '') ? 'true' : undefined}
                  className={cn(
                    'block whitespace-nowrap rounded-lg px-3 py-1.5 text-[0.95rem] font-medium transition-colors hover:text-text-primary',
                    activeId === item.href.replace('#', '') ? 'bg-card text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {showGithubButton && (
            <Button as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={<FaGithub />} className="hidden lg:inline-flex">
              GitHub
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
