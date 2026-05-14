const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // mountain-bike-banner, etc.
    label: { type: String, required: true },
    image: { type: String, default: "" },
    accentColor: { type: String, default: "#C62839" },
    category: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Banner", bannerSchema);
