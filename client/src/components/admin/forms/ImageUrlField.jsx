import { useState } from 'react';
import { Field } from '../../ui/Input.jsx';

export function ImageUrlField({ label = 'Image URL', value, onChange, error, required, hint }) {
  const [broken, setBroken] = useState(false);

  return (
    <Field label={label} error={error} required={required} hint={hint || 'Paste a link to an image hosted elsewhere.'}>
      <div className="flex items-start gap-3">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            setBroken(false);
            onChange(e.target.value);
          }}
          placeholder="https://..."
          className="w-full rounded-lg border border-border bg-transparent px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-primary"
        />
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-bg-light text-xs text-text-secondary">
          {value && !broken ? (
            <img src={value} alt="Preview" className="h-full w-full object-cover" onError={() => setBroken(true)} />
          ) : (
            '🖼️'
          )}
        </div>
      </div>
    </Field>
  );
}
