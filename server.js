import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load local .env
dotenv.config();

const PORT = process.env.PORT || 8787;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment. See README.');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

const app = express();
app.use(cors());
app.use(express.json());

// Simple health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Endpoint to accept a quote form and insert into Supabase using service_role key
app.post('/submit-quote', async (req, res) => {
  try {
    const payload = req.body;

    // Basic validation
    if (!payload || !payload.name || !payload.email || !payload.message) {
      return res.status(400).json({ message: 'Missing required fields (name, email, message)' });
    }

    // Map payload keys (camelCase) to DB column names (snake_case)
    const row = {
      name: String(payload.name).slice(0, 200),
      email: String(payload.email).slice(0, 200),
      service: String(payload.service || '').slice(0, 100),
      event_date: String(payload.eventDate || '').slice(0, 50),
      location: String(payload.location || '').slice(0, 200),
      message: String(payload.message).slice(0, 2000),
    };

    const { data, error } = await supabaseAdmin.from('quotes').insert([row]).select();
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: error.message || 'Insert failed', details: error });
    }

    return res.json({ ok: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
