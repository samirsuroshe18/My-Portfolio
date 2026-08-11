import { Badge } from '../ui/Badge.jsx';
import { formatDate } from '../../utils/formatDate.js';

export function HackathonCard({ hackathon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-glow transition-all hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative">
        {hackathon.image && (
          <img src={hackathon.image} alt={hackathon.title} className="h-44 w-full object-cover transition-transform group-hover:scale-105" />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-blue-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
          Hackathon
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-1.5">
          {hackathon.tags?.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">{hackathon.title}</h3>
        <p className="text-sm font-medium text-text-secondary">{hackathon.organizer}</p>
        <p className="text-xs text-text-secondary/80">
          {formatDate(hackathon.date)}
          {hackathon.duration ? ` • ${hackathon.duration}` : ''}
        </p>
        <p className="line-clamp-2 text-sm text-text-secondary">{hackathon.description}</p>

        {hackathon.members?.length > 0 && (
          <div className="mt-1 flex">
            {hackathon.members.slice(0, 5).map((member, i) => (
              <img
                key={i}
                src={member.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=' + member.name}
                alt={member.name}
                className="-ml-2 h-8 w-8 rounded-full border-2 border-card object-cover first:ml-0"
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
