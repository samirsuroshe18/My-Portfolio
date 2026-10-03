import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { useResourceForm } from '../../hooks/useResourceForm.js';

const DEFAULTS = {
  title: '',
  organizer: '',
  date: '',
  duration: '',
  image: '',
  description: '',
  tags: [],
  certificateUrl: '',
  githubUrl: '',
  liveUrl: '',
  youtubeUrl: '',
  members: [],
  sponsors: [],
  platformPartner: '',
  isActive: true,
};

const FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'organizer', label: 'Organizer', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'duration', label: 'Duration', hint: 'e.g. 24 Hours' },
  { name: 'image', label: 'Image', type: 'imageUrl' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 5, required: true },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'imageUrl' },
  { name: 'githubUrl', label: 'GitHub URL' },
  { name: 'liveUrl', label: 'Live URL', hint: 'Shown as a View Live button' },
  { name: 'youtubeUrl', label: 'YouTube Recap URL' },
  { name: 'members', label: 'Team Members', type: 'members', memberFields: ['name', 'avatarUrl', 'githubUrl', 'linkedinUrl'] },
  { name: 'sponsors', label: 'Sponsors', type: 'tags' },
  { name: 'platformPartner', label: 'Platform Partner' },
  { name: 'isActive', label: 'Visible on public site', type: 'checkbox' },
];

export function HackathonFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, setField, loading, submitting, serverError, submit, isEdit } = useResourceForm(
    'hackathons',
    id,
    DEFAULTS,
    { redirectTo: '/admin/hackathons' }
  );

  return (
    <DashboardLayout title={isEdit ? 'Edit Hackathon' : 'New Hackathon'}>
      {loading ? (
        <Spinner />
      ) : (
        <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} onCancel={() => navigate('/admin/hackathons')} submitting={submitting} serverError={serverError} />
      )}
    </DashboardLayout>
  );
}
