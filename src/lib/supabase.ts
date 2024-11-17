import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserPreferences = {
  dietary: string[];
  cuisines: string[];
  cooking_level: string;
  time_availability: string;
  ingredients: {
    loved: string[];
    disliked: string[];
  };
  mood_based: boolean;
};

export type User = {
  id: string;
  email: string;
  preferences?: UserPreferences;
};