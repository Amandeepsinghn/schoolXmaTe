require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Token");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  if (token.toLowerCase().startsWith("bearer ")) {
    token = token.slice(7).trim();
  } else {
    token = token.trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = { auth };
