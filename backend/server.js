const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const angelRoutes = require("./routes/angelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: "Too many requests, please try again later." },
});
app.use(limiter);

// DB Connection
connectDB();

// API Routes
app.use("/api/angel", angelRoutes);

// Rose REST Endpoint
app.post("/api/rose/send", (req, res) => {
  res.json({
    success: true,
    message: "Rose registered by backend server",
    data: req.body,
  });
});

// Sounds Catalog Endpoint
app.get("/api/sounds", (req, res) => {
  res.json({
    success: true,
    sounds: [
      { id: "bgm", name: "Heavenly Choir Synth", type: "music" },
      { id: "bell", name: "Celestial Chime", type: "effect" },
      { id: "sparkle", name: "Magic Dust Run", type: "effect" },
      { id: "wing", name: "Feather Wing Swoosh", type: "effect" },
      { id: "crackers", name: "Firework Burst", type: "effect" },
      { id: "portal", name: "Dimensional Energy", type: "effect" },
    ],
  });
});

// Effects Catalog Endpoint
app.get("/api/effects", (req, res) => {
  res.json({
    success: true,
    effects: [
      { id: "stars", name: "Twinkling 3D Starfield", status: "active" },
      { id: "particles", name: "Golden Sparkles Stream", status: "active" },
      { id: "fireworks", name: "Canvas Physics Crackers", status: "active" },
      { id: "aurora", name: "Ethereal Heavenly Rays", status: "active" },
    ],
  });
});

// Logs Endpoint
app.get("/api/logs", (req, res) => {
  res.json({ success: true, logs: [] });
});

// Settings Endpoint
app.get("/api/settings", (req, res) => {
  res.json({
    success: true,
    settings: {
      bgmEnabled: true,
      sfxEnabled: true,
      crackersEnabled: true,
      starsEnabled: true,
      particlesEnabled: true,
      volume: 0.8,
      animationSpeed: 1.0,
      themeMode: "dark",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[Angel Entry Backend Server] running on port ${PORT}`);
});
