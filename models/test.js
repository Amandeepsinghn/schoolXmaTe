const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new mongoose.Schema(
  {
    title: { type: String },
    seriesData: [{ type: Object }],
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const test = mongoose.model("test", testSchema);

module.exports = {
  test: test,
};
