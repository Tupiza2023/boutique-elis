import { mutate } from 'swr';
import { supabase } from './client';

export async function deleteData({ table, id, url }) {
  const { error } = await supabase.from(table).delete().match({ id });
  if (!error) {
    mutate(url);
  }
  return { error };
}

export async function deleteFile({ buckedName, name }) {
  const { data, error } = await supabase.storage
    .from(buckedName)
    .remove([name]);
  return { data, error };
}
