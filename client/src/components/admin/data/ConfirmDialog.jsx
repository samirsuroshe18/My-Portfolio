import { Modal } from '../../ui/Modal.jsx';
import { Button } from '../../ui/Button.jsx';

export function ConfirmDialog({ open, title = 'Are you sure?', message, onConfirm, onCancel, confirmLabel = 'Delete' }) {
  return (
    <Modal open={open} onClose={onCancel} className="max-w-sm">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {message && <p className="mt-2 text-sm text-text-secondary">{message}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
