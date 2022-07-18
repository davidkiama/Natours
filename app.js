const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello for the server", app: "app.js" });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
