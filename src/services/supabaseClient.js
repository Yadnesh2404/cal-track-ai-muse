import { createClient } from '@supabase/supabase-js';

// CalTrack Supabase Configuration
// Replace these with your actual Supabase credentials
const supabaseUrl = "https://uebdvnnwwfmwwsekubvh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmR2bm53d2Ztd3dzZWt1YnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMzk0NjIsImV4cCI6MjA3MzkxNTQ2Mn0.zjvBrC1op1w8kTRnIzo9Dra6D-Poq8Q1UQLMoiPn5Nw";

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