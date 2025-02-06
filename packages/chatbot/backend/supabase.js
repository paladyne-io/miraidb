import { createClient } from '@supabase/supabase-js';
import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.resolve()
// const pathToEnvFile = __dirname.endsWith("backend") ? path.join(__dirname, '.env') : path.join(__dirname, 'backend', '.env')

const pathToEnvFile = path.join(__dirname, '.env')

console.log("pathToEnvFile: " + pathToEnvFile)

dotenv.config({ path: pathToEnvFile })

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase
