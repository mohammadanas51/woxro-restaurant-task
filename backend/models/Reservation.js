const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: Date, required: true },
    slot: { type: String, required: true }, // e.g. "16:00"
    status: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Reservation", reservationSchema);
