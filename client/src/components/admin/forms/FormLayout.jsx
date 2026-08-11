import { Input, Textarea, Select, Checkbox } from '../../ui/Input.jsx';
import { ImageUrlField } from './ImageUrlField.jsx';
import { TagInput } from './TagInput.jsx';
import { MembersField } from './MembersField.jsx';
import { Button } from '../../ui/Button.jsx';

/**
 * Declarative create/edit form reused by every admin resource page. Each
 * *FormPage defines a `fields` config; this component renders the right
 * control per field type and wires it to useResourceForm's values/setField.
 */
export function FormLayout({ title, fields, values, errors = {}, setField, onSubmit, onCancel, submitting, serverError, submitLabel = 'Save' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5">
      {title && <h2 className="text-xl font-semibold text-text-primary">{title}</h2>}

      {fields.map((field) => {
        const value = values[field.name];
        const error = errors[field.name];
        const commonProps = { label: field.label, error, required: field.required, hint: field.hint };

        switch (field.type) {
          case 'textarea':
            return (
              <Textarea key={field.name} {...commonProps} rows={field.rows || 4} value={value || ''} onChange={(e) => setField(field.name, e.target.value)} />
            );
          case 'select':
            return (
              <Select
                key={field.name}
                {...commonProps}
                options={field.options}
                placeholder={field.placeholder}
                value={value || ''}
                onChange={(e) => setField(field.name, e.target.value)}
              />
            );
          case 'imageUrl':
            return <ImageUrlField key={field.name} {...commonProps} value={value} onChange={(v) => setField(field.name, v)} />;
          case 'tags':
            return <TagInput key={field.name} {...commonProps} value={value || []} onChange={(v) => setField(field.name, v)} />;
          case 'members':
            return (
              <MembersField key={field.name} label={field.label} value={value || []} onChange={(v) => setField(field.name, v)} fields={field.memberFields} />
            );
          case 'date':
            return (
              <Input
                key={field.name}
                {...commonProps}
                type="date"
                value={value ? String(value).slice(0, 10) : ''}
                onChange={(e) => setField(field.name, e.target.value)}
              />
            );
          case 'checkbox':
            return <Checkbox key={field.name} label={field.label} checked={Boolean(value)} onChange={(e) => setField(field.name, e.target.checked)} />;
          case 'number':
            return (
              <Input key={field.name} {...commonProps} type="number" value={value ?? ''} onChange={(e) => setField(field.name, e.target.valueAsNumber)} />
            );
          default:
            return <Input key={field.name} {...commonProps} value={value || ''} onChange={(e) => setField(field.name, e.target.value)} />;
        }
      })}

      {serverError && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{serverError}</p>}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={submitting} disabled={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
