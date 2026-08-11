import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = { title: '', isActive: true };
const FIELDS = [
  { name: 'title', label: 'Title', required: true, hint: 'e.g. Frontend Development' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function SkillCategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'skillCategories',
    id,
    DEFAULTS,
    { redirectTo: '/admin/skill-categories' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Category' : 'New Category'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/skill-categories')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
