import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgquracomfodyknvtmym.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncXVyYWNvbWZvZHlrbnZ0bXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3NjQwMDUsImV4cCI6MTk5NjM0MDAwNX0.f8JLk4W77WYKITpztDnJ0AcA2slpDYq6G_VeooOuJvA';
export const supabase = createClient(supabaseUrl, supabaseKey);