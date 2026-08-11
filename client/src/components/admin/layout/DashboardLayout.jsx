import { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar.jsx';
import { DashboardHeader } from './DashboardHeader.jsx';

export function DashboardLayout({ title, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader title={title} actions={actions} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-5">{children}</main>
      </div>
    </div>
  );
}
