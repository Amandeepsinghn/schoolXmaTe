require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/db");
const cors = require("cors");
const app = express();

connectDb();

app.use(express.json());
app.use(cors());

// Defining routes
const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

app.listen(3000);
