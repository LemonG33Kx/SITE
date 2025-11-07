import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment');
  process.exit(1);
}

const supabase = createClient(url, key);

const payload = {
  name: 'Test Script',
  email: 'test+supabase@example.com',
  service: 'test-service',
  event_date: new Date().toISOString().slice(0,10),
  location: 'Local test',
  message: 'Insertion test depuis script'
};

try {
  const { data, error } = await supabase.from('quotes').insert([payload]).select();
  if (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }
  console.log('Insert result:', data);
} catch (err) {
  console.error('Unexpected error:', err);
  process.exit(1);
}
