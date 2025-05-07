require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcrypt");
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
        password: password,
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
