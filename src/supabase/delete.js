import { mutate } from 'swr';
import { supabase } from './client';

export async function deleteData({ table, id, url }) {
  const { error } = await supabase.from(table).delete().match({ id });
  if (!error) {
    mutate(url);
  }
  return { error };
}
