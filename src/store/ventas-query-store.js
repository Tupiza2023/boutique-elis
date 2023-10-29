import { ordersUrl } from '@/services/api';
import { create } from 'zustand';

const initialState = {
  queryParams: {
    orderBy: 'createdat',
    order: 'desc',
    minLimit: 0,
    maxLimit: 10,
  },
  search: '',
  baseUrl: `${ordersUrl}?select=*`,
};

const actions = set => ({
  setQueryParams: queryParams =>
    set(state => ({ queryParams: { ...state.queryParams, ...queryParams } })),
  setSearch: search => set({ search }),
  setBaseUrl: baseUrl => set({ baseUrl }),
});

export const useQueryVentasStore = create(set => ({
  ...initialState,
  ...actions(set),
}));
