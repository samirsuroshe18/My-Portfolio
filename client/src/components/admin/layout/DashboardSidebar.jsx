import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { cn } from '../../../utils/classNames.js';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: '📊', end: true },
  { label: 'Profile', to: '/admin/profile', icon: '👤' },
  { label: 'Skill Categories', to: '/admin/skill-categories', icon: '🗃️' },
  { label: 'Skills', to: '/admin/skills', icon: '🧰' },
  { label: 'Experience', to: '/admin/experience', icon: '💼' },
  { label: 'Education', to: '/admin/education', icon: '🎓' },
  { label: 'Projects', to: '/admin/projects', icon: '🗂️' },
  { label: 'Open Source', to: '/admin/open-source', icon: '🌱' },
  { label: 'Hackathons', to: '/admin/hackathons', icon: '🏆' },
  { label: 'Blogs', to: '/admin/blogs', icon: '✍️' },
  { label: 'Social Links', to: '/admin/social-links', icon: '🔗' },
  { label: 'Site Settings', to: '/admin/site-settings', icon: '⚙️' },
  { label: 'GitHub Config', to: '/admin/github', icon: '🐙' },
  { label: 'Messages', to: '/admin/messages', icon: '📨' },
];

export function DashboardSidebar({ open, onClose }) {
  const { admin, logout } = useAuth();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="border-b border-border px-6 py-5">
          <p className="text-lg font-bold text-primary">Admin Panel</p>
          {admin && <p className="mt-1 text-xs text-text-secondary">{admin.email}</p>}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-bg-light hover:text-text-primary'
                )
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <button onClick={logout} className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-bg-light hover:text-red-500">
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}
