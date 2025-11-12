const heartbeat = (req, res) => {
  res.json({ status: "ok" });
};

module.exports = {
  heartbeat,
};
