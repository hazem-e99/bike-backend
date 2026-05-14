const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    category: {
      type: String,
      enum: ["mountain", "road", "hybrid"],
      required: true,
    },
    images: [{ type: String }],
    badge: { type: String, default: "كمية محدودة" },
    description: { type: String, default: "" },
    tags: [{ type: String }],
    features: [{ type: String }],
    specs: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    highlights: [{ type: String }],
    discount: { type: String, default: "" },
    tagline: { type: String, default: "" },
    note: { type: String, default: "" },
    gifts: [{ type: String }],
    isLimited: { type: Boolean, default: false },
    whatsappMessage: { type: String, default: "" },
    accentColor: { type: String, default: "#C62839" },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
