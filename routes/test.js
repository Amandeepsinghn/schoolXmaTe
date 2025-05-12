const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { testData } = require("../controllers/testController");

router.get("/data", auth, testData);

module.exports = router;






