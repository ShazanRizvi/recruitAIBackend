const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role key for server

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not defined in env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
