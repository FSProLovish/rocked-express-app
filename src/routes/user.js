const express = require("express");

const router = express.Router();
const { heartbeat } = require("../controllers/user");

router.get("/heartbeat", heartbeat);

module.exports = router;
