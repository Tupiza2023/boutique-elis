import { supabase } from './client';

export async function uploadFiles({ bucketName, file, path }) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, file);

  return { data, error };
}
