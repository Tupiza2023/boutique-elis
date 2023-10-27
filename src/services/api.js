import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseApi = axios.create({
  baseURL: supabaseUrl,
  headers: {
    'Content-Type': 'application/json',
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  },
});
const tagsUrl = 'rest/v1/tags';

export { supabaseApi, tagsUrl };
