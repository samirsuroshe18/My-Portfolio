import { useCallback, useState } from 'react';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { DataTable } from '../../components/admin/data/DataTable.jsx';
import { Modal } from '../../components/ui/Modal.jsx';
import { Select } from '../../components/ui/Input.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { contactApi } from '../../services/api/contact.js';
import { formatDate } from '../../utils/formatDate.js';

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'subject', label: 'Subject' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge color={row.status === 'new' ? 'info' : row.status === 'replied' ? 'success' : 'default'}>{row.status}</Badge>
    ),
  },
  { key: 'createdAt', label: 'Received', render: (row) => formatDate(row.createdAt), sortable: true },
];

export function ContactMessagesPage() {
  const [active, setActive] = useState(null);

  const fetcher = useCallback(() => contactApi.adminList({ limit: 100 }), []);
  const { data, loading, error, refetch } = useFetch(fetcher, []);

  const openMessage = async (row) => {
    const message = await contactApi.adminGetById(row._id);
    setActive(message);
    refetch();
  };

  const updateStatus = async (status) => {
    const updated = await contactApi.updateStatus(active._id, status);
    setActive(updated);
    refetch();
  };

  const removeMessage = async (row) => {
    await contactApi.remove(row._id);
    refetch();
  };

  return (
    <DashboardLayout title="Contact Messages">
      <DataTable
        columns={COLUMNS}
        data={data?.data || []}
        loading={loading}
        error={error}
        onRetry={refetch}
        onEdit={openMessage}
        onDelete={removeMessage}
        emptyTitle="No messages yet"
        emptyMessage="Messages submitted through the contact form will appear here."
      />

      <Modal open={Boolean(active)} onClose={() => setActive(null)} className="max-w-lg">
        {active && (
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{active.subject || 'No subject'}</h3>
            <p className="mt-1 text-sm text-text-secondary">
              {active.name} &lt;{active.email}&gt; • {formatDate(active.createdAt)}
            </p>
            <p className="mt-4 whitespace-pre-line text-sm text-text-primary">{active.message}</p>

            <div className="mt-6">
              <Select
                label="Status"
                value={active.status}
                onChange={(e) => updateStatus(e.target.value)}
                options={[
                  { value: 'new', label: 'New' },
                  { value: 'read', label: 'Read' },
                  { value: 'replied', label: 'Replied' },
                  { value: 'archived', label: 'Archived' },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
