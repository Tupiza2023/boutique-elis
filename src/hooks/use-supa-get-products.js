import { supabase } from '@/supabase/client';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

const initialState = {
  data: { products: [], total: null },
  range: [0, 20],
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RANGE':
      return { ...state, range: action.payload };
    default:
      throw new Error();
  }
}

export function useSupaGetProducts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const sort = router.query.sort;
  const search = router.query.search;
  const collection = router.query.collection;

  useEffect(() => {
    if (sort === null) {
      router.push({ search: '?sort=createdat-desc' });
      return;
    }
    if (!router.isReady) {
      return;
    }
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data, error, count } = await fetchData({
        sort: sort.split('-'),
        range: state.range,
        query: search || collection,
        findIn: search ? 'name' : 'tag',
      });
      dispatch({ type: 'SET_LOADING', payload: false });
      if (error) dispatch({ type: 'SET_ERROR', payload: error });
      else
        dispatch({
          type: 'SET_DATA',
          payload: { products: data, total: count },
        });
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, state.range, search, collection, router.isReady]);
  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    setRange: range => dispatch({ type: 'SET_RANGE', payload: range }),
    range: state.range,
  };
}

async function fetchData({
  sort: [column, orderSign],
  range: [start, end],
  query = null,
  findIn,
}) {
  let request = supabase
    .from('productos')
    .select('*', { count: 'estimated' })
    .order(column, { ascending: orderSign === 'asc' })
    .range(start, end);

  if (query) request = request.ilike(findIn, `%${query}%`);

  const { data, error, count } = await request;
  return { data, error, count };
}
