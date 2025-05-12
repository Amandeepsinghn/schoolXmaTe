require("dotenv").config();
const { test } = require("../models/test");

const testData = async (req, res) => {
  try {
    const userId = req.user;

    const response = await test.find({ userId: userId });

    if (!response) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  testData,
};
