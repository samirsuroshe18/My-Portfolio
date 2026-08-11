import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMediumM,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaLink,
} from 'react-icons/fa';

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  medium: FaMediumM,
  mail: FaEnvelope,
  instagram: FaInstagram,
  youtube: FaYoutube,
  other: FaLink,
};

export function SocialLink({ platform, url, label, className = '' }) {
  const Icon = ICONS[platform] || FaLink;

  return (
    <a
      href={url}
      target={platform === 'mail' ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label || platform}
      className={`grid h-10 w-10 place-items-center rounded-full text-lg text-text-primary transition-all hover:-translate-y-0.5 hover:text-primary ${className}`}
    >
      <Icon />
    </a>
  );
}
