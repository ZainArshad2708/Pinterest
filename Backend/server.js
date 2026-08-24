const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB local server se connect karna
mongoose
  .connect("mongodb://localhost:27017/pinterest_clone")
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 📦 Pin Schema (Database mein pin ka structure)
const PinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ratio: { type: String, default: "4 / 5" },
  createdAt: { type: Date, default: Date.now },
});

// 📦 Pin Model (Database se baat karne ka tool)
const Pin = mongoose.model("Pin", PinSchema);

// 📥 GET /api/pins - Database se saare pins fetch karo
app.get("/api/pins", async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json(pins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pins" });
  }
});

// 📤 POST /api/pins - Database mein naya pin save karo
app.post("/api/pins", async (req, res) => {
  try {
    const newPin = new Pin({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      ratio: req.body.ratio || "4 / 5",
    });
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (error) {
    res.status(500).json({ error: "Error saving pin" });
  }
});

// 🗑️ DELETE /api/pins/:id - Database se pin delete karo
app.delete("/api/pins/:id", async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Pin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pin" });
  }
});

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
