import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Modal } from '../ui/Modal.jsx';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { optimizeImage } from '../../utils/optimizeImage.js';

/**
 * Single field-driven detail modal reused by ProjectCard, HackathonCard, and
 * OpenSourceCard. Each caller maps its own record into this shape instead of
 * this component branching on a "category" field.
 */
export function ProjectDetailModal({ item, onClose }) {
  return (
    <Modal open={Boolean(item)} onClose={onClose}>
      {item && (
        <div>
          {item.image && <img src={optimizeImage(item.image, 1400)} alt={item.title} className="mb-5 max-h-72 w-full rounded-xl object-cover" />}

          <h2 className="text-2xl font-bold text-text-primary">{item.title}</h2>
          {item.subtitle && <p className="mt-1 text-base text-text-secondary">{item.subtitle}</p>}
          {item.meta && <p className="mt-1 text-sm text-text-secondary/80">{item.meta}</p>}

          {item.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}

          <p className="mt-4 whitespace-pre-line text-sm text-text-secondary">{item.description}</p>

          {item.members?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-text-primary">Team</p>
              <div className="flex flex-col gap-2">
                {item.members.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    {member.avatarUrl && <img src={optimizeImage(member.avatarUrl, 72)} alt={member.name} loading="lazy" decoding="async" className="h-9 w-9 rounded-full object-cover" />}
                    <span className="text-sm text-text-primary">{member.name}</span>
                    {member.githubUrl && (
                      <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary">
                        <FaGithub />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.sponsors?.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-text-primary">Sponsors</p>
              <div className="flex flex-wrap gap-2">
                {item.sponsors.map((sponsor) => (
                  <Badge key={sponsor} color="neutral">
                    {sponsor}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.actions?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {item.actions.map((action) => (
                <Button key={action.label} as="a" href={action.href} target="_blank" rel="noopener noreferrer" variant={action.variant || 'primary'} size="sm" icon={action.icon}>
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
