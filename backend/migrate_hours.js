const mongoose = require("mongoose");
const OpeningHour = require("./models/OpeningHour");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const formatTime = (timeStr) => {
  if (!timeStr) return timeStr;
  
  // Handle "10 AM" -> "10:00"
  if (timeStr.toLowerCase().includes("am") || timeStr.toLowerCase().includes("pm")) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (minutes === undefined) minutes = 0;
    
    if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  
  // Handle "9:00" -> "09:00"
  if (timeStr.includes(":")) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  
  return timeStr;
};

async function migrate() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for migration");

  const hours = await OpeningHour.find();
  for (const h of hours) {
    const newOpen = formatTime(h.openTime);
    const newClose = formatTime(h.closeTime);
    console.log(`Updating ${h.dayRange}: ${h.openTime} -> ${newOpen}, ${h.closeTime} -> ${newClose}`);
    await OpeningHour.findByIdAndUpdate(h._id, { openTime: newOpen, closeTime: newClose });
  }

  console.log("Migration complete");
  await mongoose.disconnect();
}

migrate().catch(console.error);
