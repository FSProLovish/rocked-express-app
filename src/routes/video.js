const express = require("express");

const router = express.Router();
const { getVideoById, submitVideo } = require("../controllers/video");

// GET - get video by id
router.get("/:id", getVideoById);

// POST- submit a video
router.post("/:id/submit", submitVideo);

module.exports = router;
