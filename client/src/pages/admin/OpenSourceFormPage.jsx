import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  title: '',
  projectName: '',
  repositoryUrl: '',
  pullRequestUrl: '',
  image: '',
  description: '',
  technologies: [],
  tags: [],
  status: 'Open',
  release: '',
  date: '',
  members: [],
  isActive: true,
};

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'projectName', label: 'Upstream Project Name', required: true },
  { name: 'image', label: 'Image', type: 'imageUrl' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 5, required: true },
  { name: 'technologies', label: 'Technologies', type: 'tags' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  {
    name: 'status',
    label: 'PR Status',
    type: 'select',
    options: [
      { value: 'Open', label: 'Open' },
      { value: 'Merged', label: 'Merged' },
      { value: 'Closed', label: 'Closed' },
    ],
  },
  { name: 'release', label: 'Release Version' },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'repositoryUrl', label: 'Repository URL', required: true },
  { name: 'pullRequestUrl', label: 'Pull Request URL', required: true },
  { name: 'members', label: 'Contributors', type: 'members', memberFields: ['name', 'avatarUrl'] },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function OpenSourceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'openSource',
    id,
    DEFAULTS,
    { redirectTo: '/admin/open-source' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Contribution' : 'New Contribution'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/open-source')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
