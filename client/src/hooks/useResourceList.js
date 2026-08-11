import { useCallback, useEffect, useState } from 'react';
import { RESOURCE_API } from '../services/api/registry.js';
import { apiErrorMessage } from '../services/api/client.js';

/**
 * Backs every admin DataTable page: fetches a paginated/searchable list for
 * a resource and exposes optimistic delete/reorder helpers.
 */
export function useResourceList(resourceKey, initialParams = {}) {
  const api = RESOURCE_API[resourceKey];
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    api
      .adminList(params)
      .then(({ data, meta: m }) => {
        setItems(data);
        setMeta(m);
      })
      .catch((err) => setError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, JSON.stringify(params)]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    await api.remove(id);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const update = async (id, patch) => {
    const updated = await api.update(id, patch);
    setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
  };

  const reorder = async (updates) => {
    await api.reorder(updates);
    load();
  };

  return { items, meta, loading, error, params, setParams, refetch: load, remove, update, reorder };
}
