import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';

const COLUMNS = [{ key: 'title', label: 'Title', sortable: true }];

export function SkillCategoriesListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('skillCategories');

  return (
    <DashboardLayout title="Skill Categories" actions={<Button size="sm" onClick={() => navigate('/admin/skill-categories/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/skill-categories/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isActive: !row.isActive })}
        visibilityField="isActive"
        searchable={false}
        emptyTitle="No categories yet"
        emptyMessage="Create a category (e.g. Frontend) before adding skills."
      />
    </DashboardLayout>
  );
}
