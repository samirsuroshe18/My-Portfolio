import { FaEnvelope, FaGithub, FaInstagram, FaLink, FaLinkedin, FaMedium, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { cn } from '../../utils/classNames.js';

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  medium: FaMedium,
  mail: FaEnvelope,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

/** Social links as icon plus label: the icon is found faster when scanning, the label removes any doubt. */
export function SocialLinks({ links, className = '' }) {
  if (!links?.length) return null;

  return (
    <ul className={cn('flex flex-wrap gap-x-5 gap-y-2', className)}>
      {links.map((link) => {
        const Icon = ICONS[link.platform] || FaLink;
        return (
          <li key={link._id || link.url}>
            <a
              href={link.url}
              target={link.platform === 'mail' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-text-primary transition-colors hover:text-primary"
            >
              <Icon aria-hidden="true" className="text-[1.05rem] text-text-secondary transition-colors group-hover:text-primary" />
              <span className="underline decoration-text-secondary decoration-1 underline-offset-4 group-hover:decoration-primary">{link.label || link.platform}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
