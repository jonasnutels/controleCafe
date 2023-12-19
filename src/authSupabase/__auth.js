import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  `${import.meta.env.VITE_APP_PROJETO}`,
  `${import.meta.env.VITE_APP_KEY}`,
);
