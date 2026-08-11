import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = { platform: 'github', label: '', url: '', isActive: true };

const FIELDS = [
  {
    name: 'platform',
    label: 'Platform',
    type: 'select',
    required: true,
    options: ['github', 'linkedin', 'twitter', 'medium', 'mail', 'instagram', 'youtube', 'other'].map((v) => ({
      value: v,
      label: v.charAt(0).toUpperCase() + v.slice(1),
    })),
  },
  { name: 'label', label: 'Label' },
  { name: 'url', label: 'URL', required: true, hint: 'For email, use mailto:you@example.com' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function SocialLinkFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'socialLinks',
    id,
    DEFAULTS,
    { redirectTo: '/admin/social-links' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Social Link' : 'New Social Link'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/social-links')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
