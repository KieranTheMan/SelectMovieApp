import openai from "./config.js";
import express from 'express'

const app = express()
export default app.get('/getEmbedding',async(req,res) => {
              async function main(input) {
                  await Promise.all(
                    input.map( async (movieText) => {
                        const embeddingResponse = await openai.embeddings.create({
                            model: "text-embedding-ada-002",
                            input: movieText
                        });
                        const data = { 
                          content: movieText, 
                          embedding: embeddingResponse.data[0].embedding 
                        }
                        console.log(data);  
                    })    
                  );
                  console.log('Embedding complete!');
              }
                main(content);
          })




 
  // app.get('/getResponse',async(req,res) => {
  //       //const userPrompt = req.body.userPrompt;
  //       //console.log(userPrompt)
  //       const reponse = await openai.chat.completions.create({
  //         model:'gpt-3.5-turbo',
  //         messages:[{"role":'user','content':'what is a rabbit?'}],
  //         max_tokens:100
  //       })
  //       console.log(reponse.choices[0].message)
  //     })
      
      
    