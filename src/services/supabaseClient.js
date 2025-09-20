import { createClient } from '@supabase/supabase-js';

// CalTrack Supabase Configuration
// Using environment variables for security
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Database schema reference:
 * 
 * workouts table:
 * - id (uuid, primary key)
 * - exercise_name (text)
 * - duration (integer) - in minutes
 * - calories (integer)
 * - created_at (timestamp)
 * 
 * diet table:
 * - id (uuid, primary key)
 * - meal_name (text)
 * - calories (integer)
 * - created_at (timestamp)
 * 
 * weight table:
 * - id (uuid, primary key)
 * - weight (numeric)
 * - created_at (timestamp)
 */