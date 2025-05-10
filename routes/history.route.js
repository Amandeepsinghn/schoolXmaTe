const express = require("express");
const router = express.Router();
const { getAllHistory } = require("../controllers/history.controller");

router.get("/history", getAllHistory);

module.exports = router;
