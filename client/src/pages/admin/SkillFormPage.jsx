import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';
import { useFetch } from '../../hooks/useFetch.js';
import { skillCategoriesApi } from '../../services/api/skills.js';

const DEFAULTS = { category: '', name: '', icon: '', proficiency: 80, isFeatured: false, isActive: true };

export function SkillFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categoriesData, loading: categoriesLoading } = useFetch(() => skillCategoriesApi.adminList({ limit: 100 }), []);
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'skills',
    id,
    DEFAULTS,
    { redirectTo: '/admin/skills' }
  );

  const fields = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      placeholder: 'Select a category',
      options: (categoriesData?.data || []).map((c) => ({ value: c._id, label: c.title })),
    },
    { name: 'name', label: 'Name', required: true, hint: 'e.g. React.js' },
    { name: 'icon', label: 'Icon URL', type: 'imageUrl', required: true },
    { name: 'proficiency', label: 'Proficiency (%)', type: 'number' },
    { name: 'isFeatured', label: 'Feature this skill', type: 'checkbox' },
    { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
  ];

  return (
    <DashboardLayout title={isEdit ? 'Edit Skill' : 'New Skill'}>
      {loading || categoriesLoading ? (
        <Spinner />
      ) : (
        <FormLayout fields={fields} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/skills')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
