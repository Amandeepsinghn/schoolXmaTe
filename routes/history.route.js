const express = require("express");
const router = express.Router();
const { getTests } = require("../controllers/history.controller");
const { auth } = require("../middleware/authMiddleware");

router.get("/get",auth, getTests);

module.exports = router;
