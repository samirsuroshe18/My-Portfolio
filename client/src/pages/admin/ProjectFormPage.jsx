import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  title: '',
  platform: 'web',
  image: '',
  shortDescription: '',
  description: '',
  tags: [],
  techStack: [],
  highlights: [],
  startDate: '',
  endDate: '',
  youtubeUrl: '',
  liveUrl: '',
  githubUrl: '',
  status: 'completed',
  isFeatured: false,
  isPublished: true,
};

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  {
    name: 'platform',
    label: 'Platform',
    type: 'select',
    required: true,
    options: [
      { value: 'web', label: 'Web App' },
      { value: 'android', label: 'Android App' },
      { value: 'ios', label: 'iOS App' },
      { value: 'desktop', label: 'Desktop App' },
    ],
  },
  { name: 'image', label: 'Cover Image', type: 'imageUrl', required: true },
  { name: 'shortDescription', label: 'Short Description', hint: 'Shown on the project card' },
  { name: 'description', label: 'Full Description', type: 'textarea', rows: 6, required: true },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'techStack', label: 'Tech Stack', type: 'tags' },
  { name: 'highlights', label: 'Highlights', type: 'tags' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'endDate', label: 'End Date', type: 'date' },
  { name: 'githubUrl', label: 'GitHub URL' },
  { name: 'liveUrl', label: 'Live / Store URL' },
  { name: 'youtubeUrl', label: 'YouTube Demo URL' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'completed', label: 'Completed' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'archived', label: 'Archived' },
    ],
  },
  { name: 'isFeatured', label: 'Feature this project', type: 'checkbox' },
  { name: 'isPublished', label: 'Published (visible on public site)', type: 'checkbox' },
];

export function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'projects',
    id,
    DEFAULTS,
    { redirectTo: '/admin/projects' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Project' : 'New Project'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/projects')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
