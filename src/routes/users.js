const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// All routes require auth
router.use(auth);

// GET /api/users
router.get("/", async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden" });
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

// POST /api/users
router.post(
  "/",
  [
    body("name").notEmpty().trim(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["admin", "superadmin"]),
  ],
  async (req, res) => {
    if (req.user.role !== "superadmin")
      return res.status(403).json({ message: "Forbidden" });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const exists = await User.findOne({ email: req.body.email });
      if (exists)
        return res.status(400).json({ message: "Email already in use" });
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden" });
  try {
    const update = { ...req.body };
    if (update.password) {
      const bcrypt = require("bcryptjs");
      update.password = await bcrypt.hash(update.password, 12);
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden" });
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ message: "Cannot delete own account" });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
