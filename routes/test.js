const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { testData, genTest ,startTest,submitAnswer,resumeTest, getTestById} = require("../controllers/testController");

router.get("/data", auth, testData);
router.post("/insertTest", auth, genTest);
router.post("/start", auth, startTest);
router.post("/submit", submitAnswer);
router.get("/resume/:attemptId", resumeTest);
router.get("/:testId", getTestById);

module.exports = router;
