require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

console.log(mongoURI);

if (!mongoURI) {
  console.error("Please Check environment file");
  process.exit(1);
}

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log("connected successfully");
  } catch (error) {
    console.log("connection error");
    process.exit(1);
  }
};

module.exports = {
  connectDb: connectDb,
};
