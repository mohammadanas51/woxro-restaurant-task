const mongoose = require("mongoose");
const OpeningHour = require("./models/OpeningHour");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function check() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const hours = await OpeningHour.find();
  const output = JSON.stringify(hours, null, 2);
  console.log("Found " + hours.length + " opening hour records.");
  fs.writeFileSync("db_check.json", output);

  await mongoose.disconnect();
}

check().catch(console.error);
