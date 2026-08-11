import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { SocialLink } from './SocialLink.jsx';

const FALLBACK_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const { data: settings } = usePortfolioData('siteSettings');
  const { data: profileData } = usePortfolioData('profile');

  const navItems = settings?.navItems?.length ? settings.navItems : FALLBACK_NAV_ITEMS;
  const socialLinks = profileData?.socialLinks || [];
  const footerText = settings?.footerText || `© ${new Date().getFullYear()} All rights reserved.`;
  const logoText = settings?.logoText || 'Portfolio';

  return (
    <footer className="border-t border-border/60 bg-bg-light/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center">
        <p className="text-lg font-bold text-primary">{logoText}</p>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-text-secondary transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <SocialLink key={link._id} platform={link.platform} url={link.url} label={link.label} />
            ))}
          </div>
        )}

        <p className="text-xs text-text-secondary">{footerText}</p>
      </div>
    </footer>
  );
}
