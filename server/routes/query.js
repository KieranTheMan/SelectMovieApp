import { openai, supabase, moviedb } from "../config.js";
import express from "express";
//To help process form data or handle JSON in API requests.
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

export default app.post("/userquery", async (req, res) => {
  const query = req.body.Query;
  main(query);

  async function main(input) {
    const embedding = await createEmbedding(input);
    const match = await findNearestMatch(embedding);
    await getCompletionAndImage(match, input);
  }
  async function createEmbedding(input) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input,
    });
    return embeddingResponse.data[0].embedding;
  }

  //we now match the user query with movie database
  async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc("match_movie_list", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 1,
    });

    const output = data.map((obj) => obj.content);
    return output;
  }

  //Use OpenAI to make the response conversational and inlude MovieDB Api to Result
  const chatMessages = [
    {
      role: "system",
      content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given some information on the context about movies and answers from the customer. Your main job is to formulate a short answer using the context given and answer recived from the following questions: what is your favourite movie and why?, Are you in the mood for a classic or new movie?, Do you want a fun or serious movie? If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`,
    },
  ];

  async function getCompletionAndImage(text, querys) {
    try {
      chatMessages.push({
        role: "user",
        content: `Context: ${text} Answer: ${querys}`,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: chatMessages,
        temperature: 0.5,
        frequency_penalty: 0.5,
      });

      //Moviedb API
      let search = text.slice(0, 30);
      console.log(`SEARCH ${search}`);
      const parameters = {
        query: search,
      };
      const SearchRes = await moviedb.searchMovie(parameters);
      const images = SearchRes.results.map((obj) => obj.poster_path)[0];

      console.log(`iMAGE RESULTS${images}`);
      res.json({
        title: search,
        image: images,
        message: response.choices[0].message.content,
      });
    } catch (error) {
      return error;
    }
  }
});
