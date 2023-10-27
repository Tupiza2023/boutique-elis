import { supabaseApi } from '@/services/api';
import useSWR from 'swr';

const fetcher = (url, headers = {}) =>
  supabaseApi.get(url, { headers }).then(res => res.data);

export function useData({ url, shouldFetch = true, headers }) {
  const { data, error, mutate, isLoading } = useSWR(
    shouldFetch ? url : null,
    url => fetcher(url, headers)
  );

  return { data, error, isLoading, mutate };
}
