const { getAvailableSlots } = require("./services/reservationService");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function test() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for testing");

  const date = "2026-03-13"; // A Friday
  console.log(`Testing slots for date: ${date}`);
  
  try {
    const slots = await getAvailableSlots(date);
    console.log(`Available slots: ${JSON.stringify(slots, null, 2)}`);
    console.log(`Found ${slots.length} slots.`);
  } catch (error) {
    console.error("Test failed:", error);
  }

  await mongoose.disconnect();
}

test().catch(console.error);
