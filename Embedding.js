import { openai, supabase } from './config.js'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import express from 'express';
import readTxtFile from './readTxtFile.js';

const movieTxt = readTxtFile('./movies.txt')
const app = express()

export default app.get('/getEmbedding',async(req,res) => {

      async function splitDocument(document) {
        const text = await document
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 250,
          chunkOverlap: 35,
        });
        const output = await splitter.createDocuments([text]);
        return output 
      }

      async function CreateAndStoreEmbeddings() {
        const chunkData = await splitDocument(movieTxt)
        const data = await Promise.all(
          chunkData.map( async (chunk) => {
              const embeddingResponse = await openai.embeddings.create({
                  model: "text-embedding-ada-002",
                  input: chunk.pageContent
              });
              return {
                content: chunk.pageContent, 
                embedding: embeddingResponse.data[0].embedding 
              }
          })
        );
        
        await supabase.from('movies').insert(data); 
        console.log('Embedding and storing complete!');
      }

      CreateAndStoreEmbeddings()
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
      
      
    