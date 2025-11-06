import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Server running");
});

app.post("/convert", (req, res) => {
  const input = req.body.input;
  res.json({
    original: input,
    converted: input.toUpperCase()
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
