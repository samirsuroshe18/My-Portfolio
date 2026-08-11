import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { Input, Textarea, Checkbox } from '../../components/ui/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { MembersField } from '../../components/admin/forms/MembersField.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { siteSettingsApi } from '../../services/api/siteSettings.js';
import { apiErrorMessage } from '../../services/api/client.js';

const DEFAULTS = {
  logoText: '',
  logoUrl: '',
  navItems: [],
  footerText: '',
  accentColor: '#854CE6',
  showGithubButton: true,
  metaTitle: '',
  metaDescription: '',
};

export function SiteSettingsPage() {
  const [values, setValues] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    siteSettingsApi
      .getAdmin()
      .then((data) => data && setValues({ ...DEFAULTS, ...data }))
      .catch((err) => setServerError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const setField = (name, value) => {
    setSuccess(false);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError('');
    try {
      const updated = await siteSettingsApi.save(values);
      setValues({ ...DEFAULTS, ...updated });
      setSuccess(true);
    } catch (err) {
      setServerError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Site Settings">
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5">
          {success && <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">Settings saved.</p>}

          <Input label="Logo Text / Brand Name" required value={values.logoText} onChange={(e) => setField('logoText', e.target.value)} />
          <Input label="Logo Image URL" value={values.logoUrl} onChange={(e) => setField('logoUrl', e.target.value)} />

          <MembersField
            label="Navigation Items"
            value={values.navItems}
            onChange={(v) => setField('navItems', v)}
            fields={['label', 'href']}
            addLabel="+ Add Nav Item"
          />

          <Textarea label="Footer Text" value={values.footerText} onChange={(e) => setField('footerText', e.target.value)} />

          <Input
            label="Accent Color"
            type="color"
            value={values.accentColor}
            onChange={(e) => setField('accentColor', e.target.value)}
            className="h-11 w-24 cursor-pointer p-1"
          />

          <Checkbox label="Show GitHub button in navbar" checked={values.showGithubButton} onChange={(e) => setField('showGithubButton', e.target.checked)} />

          <Input label="Meta Title (SEO)" value={values.metaTitle} onChange={(e) => setField('metaTitle', e.target.value)} />
          <Textarea label="Meta Description (SEO)" value={values.metaDescription} onChange={(e) => setField('metaDescription', e.target.value)} />

          {serverError && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{serverError}</p>}

          <div className="flex justify-end">
            <Button type="submit" loading={submitting} disabled={submitting}>
              Save Settings
            </Button>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
}
