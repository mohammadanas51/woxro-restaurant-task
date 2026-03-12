const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const MenuItem = require("./models/MenuItem");
const Reservation = require("./models/Reservation");
const OpeningHour = require("./models/OpeningHour");
const Blog = require("./models/Blog");
const Admin = require("./models/Admin");
const path = require("path");
const multer = require("multer");

// Services
const { getAvailableSlots } = require("./services/reservationService");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "qitchen-secret-key-2024";
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Multer Config ──────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ─── Auth Middleware ─────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ─── Health ──────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Qitchen API is running" });
});

// ─── AUTH ────────────────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const admin = await Admin.findById(req.adminId).select("-password");
  res.json(admin);
});

// ─── MENU (Public) ──────────────────────────────────────────
app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, createdAt: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// ─── MENU (Admin) ───────────────────────────────────────────
app.post("/api/admin/menu", authMiddleware, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

app.put("/api/admin/menu/:id", authMiddleware, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

app.delete("/api/admin/menu/:id", authMiddleware, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

// ─── RESERVATIONS (Public) ──────────────────────────────────
app.get("/api/reservations/slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });
    const slots = await getAvailableSlots(date);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: "Failed to get slots" });
  }
});

app.post("/api/reservations", async (req, res) => {
  try {
    const { name, email, phone, guests, date, slot } = req.body;
    if (!name || !email || !phone || !guests || !date || !slot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate slot is still available
    const available = await getAvailableSlots(date);
    if (!available.includes(slot)) {
      return res
        .status(400)
        .json({ error: "Selected slot is no longer available" });
    }

    const reservation = await Reservation.create({
      name,
      email,
      phone,
      guests: parseInt(guests),
      date: new Date(date),
      slot,
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// ─── RESERVATIONS (Admin) ───────────────────────────────────
app.get("/api/admin/reservations", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

app.put("/api/admin/reservations/:id", authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

// ─── OPENING HOURS (Public) ─────────────────────────────────
app.get("/api/hours", async (req, res) => {
  try {
    const hours = await OpeningHour.find();
    res.json(hours);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hours" });
  }
});

// ─── OPENING HOURS (Admin) ──────────────────────────────────
app.put("/api/admin/hours/:id", authMiddleware, async (req, res) => {
  try {
    const hour = await OpeningHour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(hour);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hours" });
  }
});

// ─── BLOGS (Public) ─────────────────────────────────────────
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

app.get("/api/blogs/id/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// ─── BLOGS (Admin) ──────────────────────────────────────────
app.post("/api/admin/blogs", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

app.put("/api/admin/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

app.delete("/api/admin/blogs/:id", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// ─── fs required for directory creation ─────────────────────
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ─── UPLOAD (Admin) ─────────────────────────────────────────
app.post("/api/admin/upload", authMiddleware, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ error: `Unknown upload error: ${err.message}` });
    }
    next();
  });
}, (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  console.log('File uploaded successfully:', req.file.filename);
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url });
});

// ─── Connect & Start ────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Qitchen API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
