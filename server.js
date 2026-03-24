import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();

   res.json({
  reply: data?.choices?.[0]?.message?.content
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
