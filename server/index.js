import express from "express";
import cors from "cors";
import getEmbedding from "./routes/Embedding.js";
import query from "./routes/query.js";

const app = express();
const corsOptions = {
  origin: "https://movieselekta.onrender.com",
  methods: ["GET", "POST"],
  allowedHeaders:"Content-Type",
};

app.use(cors(corsOptions));
//app.use(express.json({ limit: "50mb" }));

//TextSplit & Embedding MovieList and updates supabase database
app.use("/", getEmbedding);
//User Search Query & AI ....
app.use("/", query);

app.get("/", async (req, res) => {
  res.send("Hello API Server");
});

const startServer = async () => {
  try {
    app.listen(8000, () =>
      console.log("Server has started on port http://localhost:8000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
