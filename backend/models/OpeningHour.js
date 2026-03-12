const mongoose = require("mongoose");

const openingHourSchema = new mongoose.Schema(
  {
    dayRange: { type: String, required: true }, // "Monday - Friday" or "Saturday - Sunday"
    openTime: { type: String, required: true }, // "16:00"
    closeTime: { type: String, required: true }, // "22:30"
  },
  { timestamps: true },
);

module.exports = mongoose.model("OpeningHour", openingHourSchema);
