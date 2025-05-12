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
const testRoutes = require("./routes/test");
const historyRoutes = require("./routes/history.route");

app.use("/api", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/hist", historyRoutes);

app.listen(3000);
