const express = require("express");
const router = express.Router();
const { getAllHistory } = require("../controllers/history.controller");
const { auth } = require("../middleware/authMiddleware");

router.get("/get",auth, getAllHistory);

module.exports = router;
