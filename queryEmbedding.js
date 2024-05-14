import { openai, supabase } from './config.js';
import express from 'express';

const app = express()
const query = "Watch somthing fun";


export default app.get('/query',async(req,res) => {

        async function main(input) {
            
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input,
            }); 
            

            const embedding = embeddingResponse.data[0].embedding;
            
            const { data } = await supabase.rpc('match_movies', {
                query_embedding: embedding,
                match_threshold: 0.50,
                match_count: 1
            });
            console.log(data);
        }
        main(query)
});