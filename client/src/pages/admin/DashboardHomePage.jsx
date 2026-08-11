import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DashboardStatCard } from '../../components/admin/layout/DashboardStatCard.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { RESOURCE_API } from '../../services/api/registry.js';
import { contactApi } from '../../services/api/contact.js';

const STATS = [
  { key: 'skills', label: 'Skills', icon: '🧰', to: '/admin/skills' },
  { key: 'experience', label: 'Experience Entries', icon: '💼', to: '/admin/experience' },
  { key: 'education', label: 'Education Entries', icon: '🎓', to: '/admin/education' },
  { key: 'projects', label: 'Projects', icon: '🗂️', to: '/admin/projects' },
  { key: 'openSource', label: 'Open Source Contributions', icon: '🌱', to: '/admin/open-source' },
  { key: 'hackathons', label: 'Hackathons', icon: '🏆', to: '/admin/hackathons' },
  { key: 'blogs', label: 'Blog Posts', icon: '✍️', to: '/admin/blogs' },
];

async function loadCounts() {
  const entries = await Promise.all(
    STATS.map(async (stat) => {
      const { meta } = await RESOURCE_API[stat.key].adminList({ limit: 1 });
      return [stat.key, meta.total];
    })
  );
  const { meta: messagesMeta } = await contactApi.adminList({ limit: 1, status: 'new' });
  return { counts: Object.fromEntries(entries), unreadMessages: messagesMeta.total };
}

export function DashboardHomePage() {
  const { data, loading } = useFetch(loadCounts, []);

  return (
    <DashboardLayout title="Dashboard">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <DashboardStatCard key={stat.key} label={stat.label} value={data.counts[stat.key] ?? 0} icon={stat.icon} to={stat.to} />
          ))}
          <DashboardStatCard label="Unread Messages" value={data.unreadMessages ?? 0} icon="📨" to="/admin/messages" />
        </div>
      )}
    </DashboardLayout>
  );
}
