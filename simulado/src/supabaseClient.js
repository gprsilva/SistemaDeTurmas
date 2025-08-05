import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wtuswkvrzeisvlqsmtqi.supabase.co'; // substitua com sua URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dXN3a3ZyemVpc3ZscXNtdHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzM1NjUsImV4cCI6MjA2OTkwOTU2NX0.Hi0-1i-iSf4ZE0QuKPlQ9adB5sXprJFoFTQ6tbXMbZ8'; // substitua com sua public anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
