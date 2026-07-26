const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  bgmEnabled: { type: Boolean, default: true },
  sfxEnabled: { type: Boolean, default: true },
  crackersEnabled: { type: Boolean, default: true },
  starsEnabled: { type: Boolean, default: true },
  particlesEnabled: { type: Boolean, default: true },
  volume: { type: Number, default: 0.8 },
  animationSpeed: { type: Number, default: 1.0 },
  themeMode: { type: String, default: "dark" },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Setting", settingSchema);
