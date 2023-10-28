import { productsUrl } from '@/services/api';
import { create } from 'zustand';

const initialState = {
  queryParams: {
    orderBy: 'createdat',
    order: 'desc',
    minLimit: 0,
    maxLimit: 10,
  },
  search: '',
  baseUrl: `${productsUrl}?select=id,name,tag,description,featuredimageurl,availableforsale,name,price,currencycode,quantity,handle,createdat`,
};

const actions = set => ({
  setQueryParams: queryParams =>
    set(state => ({ queryParams: { ...state.queryParams, ...queryParams } })),
  setSearch: search => set({ search }),
  setBaseUrl: baseUrl => set({ baseUrl }),
});

export const useQueryProductsStore = create(set => ({
  ...initialState,
  ...actions(set),
}));
