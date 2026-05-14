const express = require("express");
const Banner = require("../models/Banner");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/banners  — public
router.get("/", async (_req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/banners/all  — admin
router.get("/all", auth, async (_req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/banners/:key  — admin, upsert by key
router.put("/:key", auth, async (req, res) => {
  try {
    const banner = await Banner.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, upsert: true, runValidators: true },
    );
    res.json(banner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
