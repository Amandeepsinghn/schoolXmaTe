require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models/user");
const saltRounds = 2;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    bcyrpt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(400).json({
          message: "Internal server error",
        });
      }

      userToSave = {
        email: email,
        password: hash,
      };

      await user.insertOne(userToSave);
      return res.status(200).json({
        message: "user has been inserted",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "server Error",
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ email });

    if (!User) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: User._id, email: User.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: User._id,
        email: User.email,
      },
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  signUp: signUp,
  logIn: logIn,
};
