require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const verifyToken = (Token) => {
  try {
    return jwt.verify(Token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
