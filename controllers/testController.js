require("dotenv").config();
const test = require('../models/test');
const TestAttempt = require('../models/testAttempt');
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

    if (!subject || !title || !difficulty) {
      return res.status(400).json({
        message: "Please provide all the required fields.",
      });
    }

    const testData = await testGeneration(subject, title, difficulty);
console.log("testData", testData);
    const newTitle = testData.title;

    // Transform options to be a single object
  const questionData = testData.questions.map((question, index) => {
  // Ensure options exist and are structured correctly
  const options = question.options && question.options[0] ? question.options[0] : {};
  return {
    questionId: `q${index + 1}`, // Generate unique questionId
    question: question.question,
    options: {
      A: options.A || "Option A",
      B: options.B || "Option B",
      C: options.C || "Option C",
      D: options.D || "Option D",
    },
    correct_option: question.correct_option,
  };
});
    await test.insertMany({
      title: newTitle,
      seriesData: questionData,
      userId: userId,
    });

    return res.status(200).json({
      message: "Successfully inserted the test.",
    });
  } catch (error) {
    console.log("Error in genTest:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const startTest = async (req, res) => {
  const { testId } = req.body;
  const userId = req.user;

  try {
    const Test = await test.findById(testId);
    if (!Test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const attempt = await TestAttempt.create({
      testId,
      userId,
      answers: [],
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false,
      startedAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({ attemptId: attempt._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const submitAnswer = async (req, res) => {
  const { attemptId, questionId, selectedOption } = req.body;

  try {
    const attempt = await TestAttempt.findById(attemptId);
    if (!attempt || attempt.isCompleted) {
      return res.status(404).json({ message: "Attempt not found or already completed" });
    }

    const Test = await test.findById(attempt.testId);
    if (!Test || !Test.seriesData || Test.seriesData.length === 0) {
      return res.status(404).json({ message: "Test data not found or invalid" });
    }

    const question = Test.seriesData.find((q) => q.questionId === questionId);
    if (!question) {
      return res.status(400).json({ message: "Invalid questionId" });
    }

    // Check if the question has already been answered
    const existingAnswerIndex = attempt.answers.findIndex((answer) => answer.questionId === questionId);

    // Check if the selected option is correct
    const isCorrect = question.correct_option === selectedOption;

    if (existingAnswerIndex !== -1) {
      // Update the existing answer
      attempt.answers[existingAnswerIndex] = { questionId, selectedOption, isCorrect };
    } else {
      // Add the answer to the answers array
      attempt.answers.push({ questionId, selectedOption, isCorrect });
    }

    // Recalculate the score
    attempt.score = attempt.answers.reduce((total, answer) => total + (answer.isCorrect ? 1 : 0), 0);

    // Check if the test is completed (all questions answered)
    if (attempt.answers.length === Test.seriesData.length) {
      attempt.isCompleted = true;
    }

    // Update the updatedAt timestamp
    attempt.updatedAt = new Date();

    // Save the updated attempt
    await attempt.save();

    res.status(200).json({ message: "Answer submitted or updated", isCompleted: attempt.isCompleted });
  } catch (error) {
    console.error("Error in submitAnswer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const resumeTest = async (req, res) => {
  const { attemptId } = req.params;

  try {
    const attempt = await TestAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const Test = await test.findById(attempt.testId);

    res.status(200).json({
      testTitle: Test.title,
      currentQuestion: Test.seriesData[attempt.currentQuestionIndex],
      answers: attempt.answers,
      score: attempt.score,
      isCompleted: attempt.isCompleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const finalSubmit = async (req, res) => {
  const { attemptId } = req.body;

  try {
    const attempt = await TestAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    if (attempt.isCompleted) {
      return res.status(400).json({ message: "Test is already completed" });
    }

    
    attempt.isCompleted = true;
    attempt.updatedAt = new Date();

    // Save the updated attempt
    await attempt.save();

    res.status(200).json({ message: "Test submitted successfully", score: attempt.score });
  } catch (error) {
    console.error("Error in finalSubmit:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  startTest,
  submitAnswer,
  resumeTest,
  testData,
  genTest,
  finalSubmit,
};
