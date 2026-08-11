import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  companyLogo: '',
  role: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  bulletPoints: [],
  technologies: [],
  achievements: [],
  certificateUrl: '',
  isActive: true,
};

const FIELDS = [
  { name: 'companyLogo', label: 'Company Logo', type: 'imageUrl' },
  { name: 'role', label: 'Role', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'location', label: 'Location' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'isCurrent', label: 'I currently work here', type: 'checkbox' },
  { name: 'endDate', label: 'End Date', type: 'date', hint: 'Leave blank if current' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'bulletPoints', label: 'Bullet Points', type: 'tags', hint: 'Key responsibilities or highlights' },
  { name: 'technologies', label: 'Technologies', type: 'tags' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'imageUrl' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function ExperienceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'experience',
    id,
    DEFAULTS,
    { redirectTo: '/admin/experience' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Experience' : 'New Experience'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout
          fields={FIELDS}
          values={values}
          setField={setField}
          onSubmit={submit}
          onCancel={() => navigate('/admin/experience')}
          submitting={submitting}
          serverError={serverError}
        />
      )}
    </DashboardLayout>
  );
}
