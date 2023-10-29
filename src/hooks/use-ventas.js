import useSWR from 'swr';
import { buildFilterParams, buildQueryParams } from '@/lib/utils';
import { supabaseApi } from '@/services/api';
import { useQueryVentasStore } from '@/store/ventas-query-store';

const fetcher = args =>
  supabaseApi
    .get(args[0], {
      headers: {
        Prefer: 'count=exact',
        Range: `${args[1]}-${args[2]}`,
      },
    })
    .then(res => {
      const contentRange = res.headers['content-range'];
      const total = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0;
      return {
        data: res.data,
        total: total,
      };
    });

export const useVentas = () => {
  const { baseUrl, search, queryParams } = useQueryVentasStore();

  const url = `${baseUrl}${buildQueryParams(queryParams)}${buildFilterParams(
    search,
    'nombrecliente'
  )}`;
  const { minLimit: start, maxLimit: end } = queryParams;
  const {
    data: resp,
    error,
    mutate,
    isLoading,
  } = useSWR([url, start, end], fetcher);
  const hasMore = Boolean(resp && end < resp.total - 1);

  return { data: resp ? resp.data : null, error, isLoading, mutate, hasMore };
};
