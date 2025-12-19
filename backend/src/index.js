const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("SpendWise API is running ✅");
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
