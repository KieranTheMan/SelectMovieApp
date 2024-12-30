import * as dotenv from "dotenv";
import { MovieDb } from "moviedb-promise";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

dotenv.config();

/** OpenAI config */
const openApiKey = process.env.VITE_OPENAI_API_KEY;
if (!openApiKey) {
  throw new Error("OpenAI API key is missing or invalid.");
}

export const openai = new OpenAI({ apiKey: openApiKey });

/**MovieDB API */
export const moviedb = new MovieDb(process.env.VITE_MOVIEDB_API_KEY);

// /** Supabase config */
const supabaseApiKey = process.env.VITE_SUPABASE_API_KEY;
if (!supabaseApiKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const supabaseUrl = process.env.VITE_SUPABASE_URL;
if (!supabaseUrl) throw new Error(`Expected env var SUPABASE_URL`);

export const supabase = createClient(supabaseUrl, supabaseApiKey);
