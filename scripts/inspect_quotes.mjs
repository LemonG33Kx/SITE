import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const { data, error } = await supabase.from('quotes').select('*').limit(1);
if (error) {
  console.error('Error selecting from quotes:', error);
  process.exit(1);
}
console.log('Sample row:', data);
