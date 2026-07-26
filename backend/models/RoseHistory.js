const mongoose = require("mongoose");

const roseHistorySchema = new mongoose.Schema({
  color: { type: String, required: true },
  startX: { type: Number },
  startY: { type: Number },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RoseHistory", roseHistorySchema);
