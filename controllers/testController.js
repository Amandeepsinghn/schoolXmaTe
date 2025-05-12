require("dotenv").config();
const { test } = require("../models/test");

const testData = async (req, res) => {
  try {
    const userid = req.user;

    const response = await test.find({ userId: userid });

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

const generateCourse = async (req, res) => {
  const userid = req.user;
};
