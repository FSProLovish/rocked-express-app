const express = require("express");
const router = express.Router();

const routes = require("./src/routes");

// health check route
router.get("/heartbeat", (req, res) => {
  res.json({ status: "ok" });
});

// Base route for the APIs
router.use("/rocked/v1", routes);

module.exports = router;
