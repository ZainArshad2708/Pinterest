const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const pins = require("./data/pins");
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend successfully connected!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Sabhi pins lao (GET)
app.get("/api/pins", (req, res) => {
  res.json(pins);
});
// Naya pin add karo (POST)
app.post("/api/pins", (req, res) => {
  const newPin = {
    id: Date.now(), // Unique ID banane ke liye
    title: req.body.title,
    imageUrl: req.body.imageUrl,
  };
  pins.push(newPin); // Array mein add karo
  res.status(201).json(newPin); // Naya pin wapas bhejo
});
// Pin delete karo (DELETE)
app.delete("/api/pins/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pins = pins.filter((p) => p.id !== id);
  res.json({ message: " Pin eleted" });
});
