const express = require("express");

const router = express.Router();
const { getLeaderboard } = require("../controllers/leaderboard");

// GET - get leaderboard API
router.get("/", getLeaderboard);

module.exports = router;
