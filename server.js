require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.options("*", cors());

connectDb();

// Defining routes
const authRoutes = require("./routes/auth");
