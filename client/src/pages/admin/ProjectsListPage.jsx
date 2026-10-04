import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';

const COLUMNS = [
  { key: 'order', label: 'Order', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'platform', label: 'Platform', sortable: true },
  { key: 'isFeatured', label: 'Featured', render: (row) => (row.isFeatured ? '⭐' : '') },
];

export function ProjectsListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('projects');

  return (
    <DashboardLayout title="Projects" actions={<Button size="sm" onClick={() => navigate('/admin/projects/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/projects/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isPublished: !row.isPublished })}
        visibilityField="isPublished"
        emptyTitle="No projects yet"
        emptyMessage="Add your first project."
      />
    </DashboardLayout>
  );
}
