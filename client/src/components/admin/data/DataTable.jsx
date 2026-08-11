import { useMemo, useState } from 'react';
import { Input } from '../../ui/Input.jsx';
import { Button } from '../../ui/Button.jsx';
import { Spinner } from '../../ui/Spinner.jsx';
import { ErrorState } from '../../ui/ErrorState.jsx';
import { EmptyState } from '../../ui/EmptyState.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';

/**
 * Generic list view reused by every admin resource page: client-side search
 * + sort, plus edit/delete/toggle-visibility row actions.
 */
export function DataTable({
  columns,
  data,
  loading,
  error,
  onRetry,
  rowKey = (row) => row._id,
  searchable = true,
  searchPlaceholder = 'Search...',
  onEdit,
  onDelete,
  onToggleVisibility,
  visibilityField,
  emptyTitle = 'No records yet',
  emptyMessage = 'Get started by creating a new one.',
  headerActions,
}) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: null, direction: 'asc' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    let rows = data || [];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((row) =>
        columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q))
      );
    }

    if (sort.key) {
      rows = [...rows].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (av === bv) return 0;
        const result = av > bv ? 1 : -1;
        return sort.direction === 'asc' ? result : -result;
      });
    }

    return rows;
  }, [data, search, sort, columns]);

  const toggleSort = (key) =>
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {searchable && (
          <div className="w-full max-w-xs">
            <Input placeholder={searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        )}
        {headerActions}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} message={emptyMessage} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-light">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && toggleSort(col.key)}
                    className={`px-4 py-3 font-semibold text-text-secondary ${col.sortable ? 'cursor-pointer select-none hover:text-primary' : ''}`}
                  >
                    {col.label}
                    {sort.key === col.key && (sort.direction === 'asc' ? ' ▲' : ' ▼')}
                  </th>
                ))}
                {(onEdit || onDelete || onToggleVisibility) && <th className="px-4 py-3 text-right font-semibold text-text-secondary">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((row) => (
                <tr key={rowKey(row)} className="transition-colors hover:bg-bg-light/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-text-primary">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                  {(onEdit || onDelete || onToggleVisibility) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {onToggleVisibility && visibilityField && (
                          <Button variant="ghost" size="sm" onClick={() => onToggleVisibility(row)}>
                            {row[visibilityField] ? 'Hide' : 'Show'}
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="secondary" size="sm" onClick={() => onEdit(row)}>
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button variant="danger" size="sm" onClick={() => setPendingDelete(row)}>
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        message="This record will be permanently deleted. This cannot be undone."
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          onDelete(pendingDelete);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
