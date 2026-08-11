import { useState } from 'react';
import { Field } from '../../ui/Input.jsx';

export function TagInput({ label, value = [], onChange, error, required, hint, placeholder = 'Type and press Enter' }) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft('');
  };

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag));

  return (
    <Field label={label} error={error} required={required} hint={hint}>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border px-2.5 py-2">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-primary/70 hover:text-primary">
              ✕
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag();
            }
          }}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ''}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm text-text-primary outline-none"
        />
      </div>
    </Field>
  );
}
