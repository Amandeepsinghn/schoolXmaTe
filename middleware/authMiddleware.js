const { verifyToken } = require("../utils/token");

const auth = (req, res, next) => {
  const token = req.header("Token");

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verfication failed" });
  }
};

module.exports = {
  auth,
};
