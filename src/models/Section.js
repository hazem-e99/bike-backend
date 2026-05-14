const mongoose = require("mongoose");

// Generic section content model — covers warranty, gifts, trust, FAQ, CTA, etc.
const sectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // 'warranty', 'gifts', 'faq', 'cta', etc.
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // flexible JSON
  },
  { timestamps: true },
);

module.exports = mongoose.model("Section", sectionSchema);
