import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfasjucikduavovvhskz.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYXNqdWNpa2R1YXZvdnZoc2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjI2NTYsImV4cCI6MjA2MzIzODY1Nn0.ikJ4CaB9zjK5pqFuwXVcpMjqH5lfmyjOz1OE-5tUPKg';            

export const supabase = createClient(supabaseUrl, supabaseKey);
