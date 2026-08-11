import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';

const COLUMNS = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'projectName', label: 'Project', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export function OpenSourceListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('openSource');

  return (
    <DashboardLayout title="Open Source" actions={<Button size="sm" onClick={() => navigate('/admin/open-source/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/open-source/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isActive: !row.isActive })}
        visibilityField="isActive"
        emptyTitle="No contributions yet"
        emptyMessage="Add your first open source contribution."
      />
    </DashboardLayout>
  );
}
