const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

module.exports = {
  user: user,
};
