import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESOURCE_API } from '../services/api/registry.js';
import { apiErrorMessage } from '../services/api/client.js';

/**
 * Backs every admin create/edit form page: loads the existing record (if id
 * is given), tracks field values, and submits create or update.
 */
export function useResourceForm(resourceKey, id, defaultValues, { redirectTo } = {}) {
  const api = RESOURCE_API[resourceKey];
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    api
      .adminGetById(id)
      .then((data) => setValues({ ...defaultValues, ...data }))
      .catch((err) => setServerError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const submit = async () => {
    setSubmitting(true);
    setServerError('');
    try {
      if (isEdit) {
        await api.update(id, values);
      } else {
        await api.create(values);
      }
      navigate(redirectTo);
      return true;
    } catch (err) {
      setServerError(apiErrorMessage(err));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { values, setValues, setField, loading, submitting, serverError, submit, isEdit };
}
