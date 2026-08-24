const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer"); // built-in used for uploading
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//it stores uploaded files
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`,
    );
  },
});
//shows the uploaded files
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype.startsWith("image/"));
  },
});

//  MongoDB local server se connect karna
mongoose
  .connect("mongodb://localhost:27017/pinterest_clone")
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//  Pin Schema (Database mein pin ka structure)
const PinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, required: true },
  ratio: { type: String, default: "4 / 5" },
  createdAt: { type: Date, default: Date.now },
});

//  Pin Model (Database se baat karne ka tool)
const Pin = mongoose.model("Pin", PinSchema);

//  GET /api/pins - Database se saare pins fetch karo
app.get("/api/pins", async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json(pins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pins" });
  }
});

//  POST /api/pins - Database mein naya pin save karo
app.post("/api/pins", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "An image file is required" });
    }

    const newPin = new Pin({
      title: req.body.title,
      description: req.body.description,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
      ratio: req.body.ratio || "4 / 5",
    });
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (error) {
    res.status(500).json({ error: "Error saving pin" });
  }
});

app.patch("/api/pins/:id", upload.single("image"), async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      ratio: req.body.ratio || "4 / 5",
    };

    if (req.file) {
      updates.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updatedPin = await Pin.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPin) {
      return res.status(404).json({ error: "Pin not found" });
    }

    res.json(updatedPin);
  } catch (error) {
    res.status(500).json({ error: "Error updating pin" });
  }
});

//  DELETE /api/pins/:id - Database se pin delete karo
app.delete("/api/pins/:id", async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Pin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pin" });
  }
});

//  Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
