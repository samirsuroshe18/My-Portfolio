import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function Footer() {
  const { data: settings } = usePortfolioData('siteSettings');
  const { data: profileData } = usePortfolioData('profile');

  const socialLinks = profileData?.socialLinks || [];
  const footerText = settings?.footerText || `© ${new Date().getFullYear()} All rights reserved.`;

  return (
    <footer className="mx-auto max-w-[1120px] px-[clamp(16px,5vw,48px)]">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-border py-7 text-sm text-text-secondary">
        <p>{footerText}</p>
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {socialLinks.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target={link.platform === 'mail' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-4 transition-colors hover:text-text-primary"
              >
                {link.label || link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
