import { useState } from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle.jsx';
import { Button } from '../ui/Button.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../utils/classNames.js';

const FALLBACK_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings } = usePortfolioData('siteSettings');
  const { data: profileData } = usePortfolioData('profile');

  const navItems = settings?.navItems?.length ? settings.navItems : FALLBACK_NAV_ITEMS;
  const activeId = useScrollSpy(navItems.map((item) => item.href.replace('#', '')));

  const logoText = settings?.logoText || 'Portfolio';
  const githubUrl = profileData?.profile?.githubUrl;
  const showGithubButton = settings?.showGithubButton !== false && githubUrl;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="text-xl font-bold text-text-primary">
          {logoText}
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  activeId === item.href.replace('#', '') ? 'text-primary' : 'text-text-secondary'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {showGithubButton && (
            <Button as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={<FaGithub />}>
              GitHub
            </Button>
          )}
          <ThemeToggle />
        </div>

        <button className="text-2xl text-text-primary lg:hidden" onClick={() => setIsOpen((v) => !v)} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border/60 bg-bg px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm font-medium text-text-primary" onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3">
            {showGithubButton && (
              <Button as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={<FaGithub />}>
                GitHub
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
