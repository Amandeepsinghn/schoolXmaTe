const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      questionId: { type: String, required: true },
      selectedOption: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  currentQuestionIndex: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TestAttempt", testAttemptSchema);