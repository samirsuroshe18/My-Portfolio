import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  title: '',
  description: '',
  coverImage: '',
  url: '',
  publishedAt: '',
  tags: [],
  isFeatured: false,
  isActive: true,
};

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', hint: 'Short excerpt shown on the card' },
  { name: 'coverImage', label: 'Cover Image', type: 'imageUrl' },
  { name: 'url', label: 'Medium URL', required: true },
  { name: 'publishedAt', label: 'Published Date', type: 'date', required: true },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'isFeatured', label: 'Feature this post', type: 'checkbox' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function BlogFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm('blogs', id, DEFAULTS, {
    redirectTo: '/admin/blogs',
  });

  return (
    <DashboardLayout title={isEdit ? 'Edit Blog Post' : 'New Blog Post'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/blogs')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
