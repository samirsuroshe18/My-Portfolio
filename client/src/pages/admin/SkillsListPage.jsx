import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'proficiency', label: 'Proficiency', render: (row) => `${row.proficiency}%` },
  { key: 'isFeatured', label: 'Featured', render: (row) => (row.isFeatured ? '⭐' : '') },
];

export function SkillsListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('skills');

  return (
    <DashboardLayout title="Skills" actions={<Button size="sm" onClick={() => navigate('/admin/skills/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/skills/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isActive: !row.isActive })}
        visibilityField="isActive"
        emptyTitle="No skills yet"
        emptyMessage="Create a category first, then add skills to it."
      />
    </DashboardLayout>
  );
}
