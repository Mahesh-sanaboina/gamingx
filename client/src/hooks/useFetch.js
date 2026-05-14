import { useEffect, useState } from 'react';

const useFetch = (callback, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const run = async () => {
      try {
        const result = await callback();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    run();

    return () => {
      mounted = false;
    };
  }, deps);

  return { loading, data, error };
};

export default useFetch;
