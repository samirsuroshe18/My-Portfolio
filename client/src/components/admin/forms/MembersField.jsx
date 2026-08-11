import { Field } from '../../ui/Input.jsx';
import { Button } from '../../ui/Button.jsx';

const FIELD_PLACEHOLDERS = {
  name: 'Name',
  avatarUrl: 'Avatar URL',
  githubUrl: 'GitHub URL',
  linkedinUrl: 'LinkedIn URL',
  label: 'Label (e.g. About)',
  href: 'Href (e.g. #about)',
};

/** Editor for arrays of member sub-documents ({name, avatarUrl, ...}) used by Hackathons and Open Source forms. */
export function MembersField({ label = 'Members', value = [], onChange, fields = ['name', 'avatarUrl'], addLabel = '+ Add Member' }) {
  const emptyMember = Object.fromEntries(fields.map((f) => [f, '']));

  const updateMember = (index, key, val) => {
    const next = [...value];
    next[index] = { ...next[index], [key]: val };
    onChange(next);
  };

  const removeMember = (index) => onChange(value.filter((_, i) => i !== index));
  const addMember = () => onChange([...value, emptyMember]);

  return (
    <Field label={label}>
      <div className="flex flex-col gap-3">
        {value.map((member, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
            {fields.map((f) => (
              <input
                key={f}
                value={member[f] || ''}
                onChange={(e) => updateMember(index, f, e.target.value)}
                placeholder={FIELD_PLACEHOLDERS[f] || f}
                className="min-w-[140px] flex-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm text-text-primary outline-none focus:border-primary"
              />
            ))}
            <button type="button" onClick={() => removeMember(index)} className="text-sm text-red-500 hover:underline">
              Remove
            </button>
          </div>
        ))}
        <Button type="button" variant="secondary" size="sm" onClick={addMember} className="self-start">
          {addLabel}
        </Button>
      </div>
    </Field>
  );
}
