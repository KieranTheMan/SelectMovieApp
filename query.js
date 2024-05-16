import { openai, supabase } from './config.js';
import express from 'express';

const app = express()
const query = "recommend me 3 movies to watch?";


export default app.get('/query',async(req,res) => {
    
    async function main(input) {
        const embedding = await createEmbedding(input)
        const match = await findNearestMatch(embedding)
    }

        async function createEmbedding(input) {
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input,
            });    
            return embeddingResponse.data[0].embedding;
        }
            
        async function findNearestMatch(embedding) { 
            const { data } = await supabase.rpc('match_movies', {
                query_embedding: embedding,
                match_threshold: 0.50,
                match_count: 4
            });
            const match = data.map(obj => obj.content).join();
            return match
        }
        main(query);
});