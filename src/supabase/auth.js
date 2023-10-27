import { supabase } from './client';

export async function singIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export const singOut = () => supabase.auth.signOut();
