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



module.exports = mongoose.model('test', testSchema);
