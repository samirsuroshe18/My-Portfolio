import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/admin/layout/DashboardLayout.jsx';
import { Input, Checkbox } from '../../components/ui/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Spinner } from '../../components/ui/Spinner.jsx';
import { githubApi } from '../../services/api/github.js';
import { apiErrorMessage } from '../../services/api/client.js';

const DEFAULTS = { username: '', displayContributionGraph: true };

export function GitHubConfigPage() {
  const [values, setValues] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    githubApi
      .getAdminConfig()
      .then((data) => data && setValues({ ...DEFAULTS, ...data }))
      .catch((err) => setServerError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError('');
    try {
      const updated = await githubApi.saveConfig(values);
      setValues({ ...DEFAULTS, ...updated });
      setSuccess(true);
    } catch (err) {
      setServerError(apiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="GitHub Activity">
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5">
          <p className="text-sm text-text-secondary">
            Set your GitHub username to show a contribution activity graph on your public portfolio.
          </p>

          {success && <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">Saved.</p>}

          <Input
            label="GitHub Username"
            value={values.username}
            onChange={(e) => {
              setSuccess(false);
              setValues((prev) => ({ ...prev, username: e.target.value }));
            }}
            placeholder="octocat"
          />
          <Checkbox
            label="Show contribution graph on public site"
            checked={values.displayContributionGraph}
            onChange={(e) => setValues((prev) => ({ ...prev, displayContributionGraph: e.target.checked }))}
          />

          {serverError && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{serverError}</p>}

          <Button type="submit" loading={submitting} disabled={submitting}>
            Save
          </Button>
        </form>
      )}
    </DashboardLayout>
  );
}
