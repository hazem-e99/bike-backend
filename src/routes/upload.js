const express = require("express");
const path = require("path");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

// POST /api/upload  — single file
router.post("/", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const host = `${req.protocol}://${req.get("host")}`;
  const url = `${host}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// POST /api/upload/multiple  — up to 10 files
router.post("/multiple", auth, upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ message: "No files uploaded" });
  const host = `${req.protocol}://${req.get("host")}`;
  const urls = req.files.map((f) => ({
    url: `${host}/uploads/${f.filename}`,
    filename: f.filename,
  }));
  res.json(urls);
});

module.exports = router;
