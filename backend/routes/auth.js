// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../authMiddleware");

router.get("/me", verifyToken, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    name: req.user.name || "Anonymous",
  });
});

module.exports = router;
