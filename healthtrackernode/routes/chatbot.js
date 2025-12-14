const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  // simple demo chatbot (replace with OpenAI later)
  const reply = `Fitness Tip: Stay consistent. You said: ${message}`;

  res.json({ reply });
});

module.exports = router;
