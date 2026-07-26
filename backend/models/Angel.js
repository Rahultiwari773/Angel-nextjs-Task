const mongoose = require("mongoose");

const angelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entryType: { type: Number, required: true, enum: [1, 2, 3, 4, 5, 6] },
  description: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Angel", angelSchema);
