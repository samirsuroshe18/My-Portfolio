import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';

const COLUMNS = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'organizer', label: 'Organizer', sortable: true },
];

export function HackathonsListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('hackathons');

  return (
    <DashboardLayout title="Hackathons" actions={<Button size="sm" onClick={() => navigate('/admin/hackathons/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/hackathons/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isActive: !row.isActive })}
        visibilityField="isActive"
        emptyTitle="No hackathons yet"
        emptyMessage="Add your first hackathon or achievement."
      />
    </DashboardLayout>
  );
}
