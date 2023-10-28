import useSWR from 'swr';
import {
  buildFilterParams,
  buildLimitHeader,
  buildQueryParams,
} from '@/lib/utils';
import { useQueryProductsStore } from '@/store/products-query-store';
import { useMemo } from 'react';
import { supabaseApi } from '@/services/api';

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

export const useProducts = () => {
  const { baseUrl, search, queryParams } = useQueryProductsStore();

  const url = `${baseUrl}${buildQueryParams(queryParams)}${buildFilterParams(
    search
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
