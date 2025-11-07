import { createClient } from '@supabase/supabase-js';
// Optional: SendGrid for server-side email notifications
import sendgrid from '@sendgrid/mail';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Configure SendGrid if API key is present
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO; // destination email (your inbox)
const EMAIL_FROM = process.env.EMAIL_FROM; // verified sender
if (SENDGRID_API_KEY) {
  sendgrid.setApiKey(SENDGRID_API_KEY);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const payload = req.body;

    if (!payload || !payload.name || !payload.email || !payload.message) {
      return res.status(400).json({ message: 'Champs requis manquants (name, email, message)' });
    }

    // Minimal sanitization / trimming and map to DB column names (snake_case)
    const clean = {
      name: String(payload.name).slice(0, 200),
      email: String(payload.email).slice(0, 200),
      service: String(payload.service || '').slice(0, 100),
      event_date: String(payload.eventDate || '').slice(0, 50),
      location: String(payload.location || '').slice(0, 200),
      message: String(payload.message).slice(0, 2000),
    };

    const { data, error } = await supabaseAdmin.from('quotes').insert([clean]).select();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: error.message || 'Insert failed', details: error });
    }

    // Send notification email (non-blocking) if SendGrid configured
    if (SENDGRID_API_KEY && EMAIL_TO && EMAIL_FROM) {
      const subject = `Nouvelle demande de devis de ${clean.name}`;
      const text = `Nom: ${clean.name}\nEmail: ${clean.email}\nService: ${clean.service}\nDate: ${clean.event_date}\nLieu: ${clean.location}\n\nMessage:\n${clean.message}`;
      const msg = {
        to: EMAIL_TO,
        from: EMAIL_FROM,
        subject,
        text,
      };
      try {
        await sendgrid.send(msg);
        console.log('SendGrid: notification envoyée à', EMAIL_TO);
      } catch (mailErr) {
        console.warn('SendGrid error (non-blocking):', mailErr);
      }
    } else {
      if (!SENDGRID_API_KEY) console.debug('SendGrid not configured (SENDGRID_API_KEY missing)');
      else if (!EMAIL_TO || !EMAIL_FROM) console.debug('SendGrid configured but EMAIL_TO/EMAIL_FROM missing');
    }

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
