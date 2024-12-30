import { openai, supabase } from "../config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import express from "express";
import readTxtFile from "../utils/readTxtFile.js";

const movieTxt = readTxtFile("./movies.txt");
const app = express();

export default app.get("/getEmbedding", async (req, res) => {
  async function splitDocument(document) {
    const text = await document;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 160,
      chunkOverlap: 15,
    });
    const output = await splitter.createDocuments([text]);
    return output;
  }

  async function CreateAndStoreEmbeddings() {
    const chunkData = await splitDocument(movieTxt);
    const data = await Promise.all(
      chunkData.map(async (chunk) => {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk.pageContent,
        });
        return {
          content: chunk.pageContent,
          embedding: embeddingResponse.data[0].embedding,
        };
      })
    );

    const { data: insertData, error } = await supabase
      .from("movie_list")
      .insert(data)
      .select("id, content");

    if (error) {
      console.error("Error inserting data:", error);
      return res
        .status(500)
        .json({ error: "Failed to insert data into Supabase", error });
    } else {
      console.log("Embedding and storing complete!", insertData);
      res
        .status(200)
        .json({
          message: "Data successfully inserted into Supabase",
          insertData,
        });
    }
  }

  CreateAndStoreEmbeddings();
});
