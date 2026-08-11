import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  institutionLogo: '',
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  grade: '',
  description: '',
  certificateUrl: '',
  isActive: true,
};

const FIELDS = [
  { name: 'institutionLogo', label: 'Institution Logo', type: 'imageUrl' },
  { name: 'school', label: 'School / Institution', required: true },
  { name: 'degree', label: 'Degree', required: true },
  { name: 'field', label: 'Field of Study' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'isCurrent', label: 'Currently studying', type: 'checkbox' },
  { name: 'endDate', label: 'End Date', type: 'date', hint: 'Leave blank if current' },
  { name: 'grade', label: 'Grade', hint: 'Percentage, CGPA, or anything free-form' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'imageUrl' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function EducationFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'education',
    id,
    DEFAULTS,
    { redirectTo: '/admin/education' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Education' : 'New Education'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/education')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
