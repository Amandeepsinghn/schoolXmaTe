const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { testData, genTest } = require("../controllers/testController");

router.get("/data", auth, testData);
router.post("/insertTest", auth, genTest);

module.exports = router;
