const express = require("express");
const router = express.Router();

// const authRoutes = require("./auth");
const userRoutes = require("./user");
const videoRoutes = require("./video");
const leaderboardRoutes = require("./leaderboard");

// router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/video", videoRoutes);
router.use("/leaderboard", leaderboardRoutes);

module.exports = router;
