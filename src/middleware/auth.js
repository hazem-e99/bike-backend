const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or inactive user" });
    }
    req.user = user;
    next();
  } catch {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token invalid or expired" });
  }
};
