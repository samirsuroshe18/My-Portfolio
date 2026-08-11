import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { FormLayout } from '../../components/admin/forms/FormLayout.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { profileApi } from '../../services/api/profile.js';
import { apiErrorMessage } from '../../services/api/client.js';

const DEFAULTS = {
  name: '',
  headline: '',
  roles: [],
  shortBio: '',
  description: '',
  avatarUrl: '',
  location: '',
  availability: '',
  githubUrl: '',
  linkedinUrl: '',
  twitterUrl: '',
  mediumUrl: '',
  resumeUrl: '',
  contactEmail: '',
};

const FIELDS = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'headline', label: 'Headline' },
  { name: 'roles', label: 'Rotating Roles', type: 'tags', required: true, hint: 'Shown in the hero typewriter animation' },
  { name: 'shortBio', label: 'Short Bio', hint: 'Shown in the About section' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 5, required: true, hint: 'Shown in the Hero section' },
  { name: 'avatarUrl', label: 'Avatar', type: 'imageUrl' },
  { name: 'location', label: 'Location' },
  { name: 'availability', label: 'Availability' },
  { name: 'contactEmail', label: 'Contact Email', required: true },
  { name: 'resumeUrl', label: 'Resume URL' },
  { name: 'githubUrl', label: 'GitHub URL' },
  { name: 'linkedinUrl', label: 'LinkedIn URL' },
  { name: 'twitterUrl', label: 'Twitter URL' },
  { name: 'mediumUrl', label: 'Medium URL' },
];

export function ProfileEditPage() {
  const [values, setValues] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    profileApi
      .getAdmin()
      .then((data) => data && setValues({ ...DEFAULTS, ...data }))
      .catch((err) => setServerError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const setField = (name, value) => {
    setSuccess(false);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setSubmitting(true);
    setServerError('');
    try {
      const updated = await profileApi.save(values);
      setValues({ ...DEFAULTS, ...updated });
      setSuccess(true);
    } catch (err) {
      setServerError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Profile">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {success && <p className="mx-auto mb-4 max-w-2xl rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">Profile saved.</p>}
          <FormLayout fields={FIELDS} values={values} setField={setField} onSubmit={submit} submitting={submitting} serverError={serverError} submitLabel="Save Profile" />
        </>
      )}
    </DashboardLayout>
  );
}
