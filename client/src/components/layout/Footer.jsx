import { SocialLinks } from './SocialLinks.jsx';
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
        <SocialLinks links={socialLinks} className="[&_a]:text-sm [&_a]:font-medium" />
      </div>
    </footer>
  );
}
