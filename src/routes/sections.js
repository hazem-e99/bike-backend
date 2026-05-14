const express = require("express");
const Section = require("../models/Section");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/sections  — public
router.get("/", async (_req, res) => {
  try {
    const sections = await Section.find({ isActive: true });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/sections/:key  — public
router.get("/:key", async (req, res) => {
  try {
    const section = await Section.findOne({ key: req.params.key });
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/sections/:key  — admin, upsert
router.put("/:key", auth, async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, upsert: true },
    );
    res.json(section);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
