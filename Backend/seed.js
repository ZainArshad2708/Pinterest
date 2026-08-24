const mongoose = require("mongoose");
const pins = require("./data/pins");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pinterest_clone";

const Pin = mongoose.model(
  "Pin",
  new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ratio: { type: String, default: "4 / 5" },
    createdAt: { type: Date, default: Date.now },
  }),
);

async function seed() {
  await mongoose.connect(mongoUri);
  // await Pin.deleteMany({}); //this line deletes the entire database, we'll fix it later
  await Pin.insertMany(pins);
  console.log(`Replaced all pins with ${pins.length} preloaded pins.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Unable to seed pins:", error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
