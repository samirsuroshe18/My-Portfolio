import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { useResourceList } from '../../hooks/useResourceList.js';
import { formatDateRange } from '../../utils/formatDate.js';

const COLUMNS = [
  { key: 'school', label: 'School', sortable: true },
  { key: 'degree', label: 'Degree', sortable: true },
  { key: 'dateRange', label: 'Duration', render: (row) => formatDateRange(row.startDate, row.endDate, row.isCurrent) },
];

export function EducationListPage() {
  const navigate = useNavigate();
  const { items, loading, error, refetch, remove, update } = useResourceList('education');

  return (
    <DashboardLayout title="Education" actions={<Button size="sm" onClick={() => navigate('/admin/education/new')}>+ New</Button>}>
      <DataTable
        columns={COLUMNS}
        data={items}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={(row) => navigate(`/admin/education/${row._id}/edit`)}
        onDelete={(row) => remove(row._id)}
        onToggleVisibility={(row) => update(row._id, { isActive: !row.isActive })}
        visibilityField="isActive"
        emptyTitle="No education entries"
        emptyMessage="Add your academic background."
      />
    </DashboardLayout>
  );
}
