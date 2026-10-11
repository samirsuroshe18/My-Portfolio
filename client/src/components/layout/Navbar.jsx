import { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle.jsx';
import { Button } from '../ui/Button.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../utils/classNames.js';
import { navHref } from '../../utils/portfolio.js';

const FALLBACK_NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Writing', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const FADE = 28;

/**
 * Tells which sides of a sideways-scrolling row still have content out of view,
 * so the row can fade at that edge as a hint that it scrolls.
 */
function useScrollEdges() {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    const update = () => {
      const left = row.scrollLeft > 2;
      const right = row.scrollLeft + row.clientWidth < row.scrollWidth - 2;
      setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(row);
    if (row.firstElementChild) resizeObserver.observe(row.firstElementChild);
    return () => {
      row.removeEventListener('scroll', update);
      resizeObserver.disconnect();
    };
  }, []);

  const mask =
    edges.left || edges.right
      ? `linear-gradient(to right, ${edges.left ? 'transparent' : 'black'}, black ${FADE}px, black calc(100% - ${FADE}px), ${edges.right ? 'transparent' : 'black'})`
      : undefined;

  return { ref, style: { maskImage: mask, WebkitMaskImage: mask } };
}

export function Navbar() {
  const { data: settings } = usePortfolioData('siteSettings');
  const { data: profileData } = usePortfolioData('profile');

  const navItems = settings?.navItems?.length ? settings.navItems : FALLBACK_NAV_ITEMS;
  const activeId = useScrollSpy(navItems.map((item) => item.href.replace('#', '')));

  const logoText = settings?.logoText || 'Portfolio';
  const navRow = useScrollEdges();
  const githubUrl = profileData?.profile?.githubUrl;
  const showGithubButton = settings?.showGithubButton !== false && githubUrl;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-7 gap-y-1 px-[clamp(16px,5vw,48px)] py-3">
        <a href="/#about" className="font-serif text-2xl leading-none text-text-primary">
          {logoText}
        </a>

        {/* on phones the links drop to their own line and scroll sideways; the scrollbar is hidden and the row fades where more links wait */}
        <nav ref={navRow.ref} style={navRow.style} aria-label="Sections" className="order-3 min-w-0 basis-full overflow-x-auto [scrollbar-width:none] sm:order-none sm:flex-1 sm:basis-auto [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max gap-1 sm:ml-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={navHref(item.href)}
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
            <div className="hidden lg:block">
              <Button as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={<FaGithub />}>
                GitHub
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
