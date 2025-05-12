require("dotenv").config();
const { test } = require("../models/test");

const { testGeneration } = require("../utils/testGeneration");

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

const genTest = async (req, res) => {
  try {
    const userId = req.user;
    const { subject, title, difficulty } = req.body;

    const testData = await testGeneration(subject, title, difficulty);

    const newTitle = testData.title;

    const questionData = testData.questions;

    await test.insertMany({
      title: newTitle,
      seriesData: questionData,
      userId: userId,
    });

    return res.status(200).json({
      message: "successfully inserted the test.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  testData,
  genTest,
};
