const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true }, 
  testId: { type: Schema.Types.ObjectId, ref: "test", required: true }, 
  score: { type: Number },
  takenAt: { type: Date, default: Date.now }, 
  answers: [{ type: Object }], 
  });

const history = mongoose.model("history", historySchema);

module.exports = {
  history: history,
};
