const OpeningHour = require("../models/OpeningHour");
const Reservation = require("../models/Reservation");

const generateSlots = (openTime, closeTime) => {
  const slots = [];
  
  // Ensure "HH:mm" format for parsing
  const normalize = (t) => {
    if (t.includes(" ")) { // Handle "10 AM" if it somehow persists
      const [time, modifier] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (isNaN(m)) m = 0;
      if (modifier.toLowerCase() === "pm" && h < 12) h += 12;
      if (modifier.toLowerCase() === "am" && h === 12) h = 0;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    return t.padStart(5, "0"); // Handle "9:00" -> "09:00"
  };

  const startT = normalize(openTime);
  const endT = normalize(closeTime);

  let current = new Date(`1970-01-01T${startT}:00`);
  const end = new Date(`1970-01-01T${endT}:00`);

  // Handle cases where end time is midnight (00:00) of the next day
  if (end <= current) {
    end.setDate(end.getDate() + 1);
  }

  while (current < end) {
    const hours = String(current.getHours()).padStart(2, "0");
    const minutes = String(current.getMinutes()).padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + 30);
  }
  return slots;
};

const getAvailableSlots = async (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0=Sun, 6=Sat
  const range =
    day === 0 || day === 6 ? "Saturday - Sunday" : "Monday - Friday";

  const hours = await OpeningHour.findOne({ dayRange: range });
  if (!hours) return [];

  const allSlots = generateSlots(hours.openTime, hours.closeTime);

  // Get start/end of the day for query
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const reservations = await Reservation.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: "CANCELLED" },
  });

  // Count reservations per slot — max 5 per slot
  const MAX_PER_SLOT = 5;
  const slotCounts = {};
  reservations.forEach((r) => {
    slotCounts[r.slot] = (slotCounts[r.slot] || 0) + 1;
  });

  return allSlots.filter((s) => (slotCounts[s] || 0) < MAX_PER_SLOT);
};

module.exports = { getAvailableSlots };
