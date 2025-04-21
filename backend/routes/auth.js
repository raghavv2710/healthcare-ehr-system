const express = require("express");
const router = express.Router();
const verifyToken = require("../authMiddleware");

router.get("/me", verifyToken, (req, res) => {
  const { uid, email, role } = req.user;
  res.json({ uid, email, role });
});

module.exports = router;
