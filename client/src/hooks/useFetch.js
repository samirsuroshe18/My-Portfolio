import { useCallback, useEffect, useState } from 'react';
import { apiErrorMessage } from '../services/api/client.js';

/**
 * Generic data-fetching hook: wraps any promise-returning function with
 * loading/error/data state and a refetch callback. Every public section and
 * admin page uses this same shape so loading/error/empty UI stays consistent.
 */
export function useFetch(fetcherFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcher = useCallback(fetcherFn, deps);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then((result) => setData(result))
      .catch((err) => setError(apiErrorMessage(err)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
