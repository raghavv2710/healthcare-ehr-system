// routes/auth.js
const express = require("express");
const router = express.Router();
const admin = require("../firebase"); // Firebase Admin SDK
const authenticate = require("../authMiddleware");

// Save patient details (you can add DB logic later)
router.post("/register-patient", authenticate, async (req, res) => {
  const { email } = req.body;

  try {
    // Optional: Check if user already exists in DB
    // You can add database logic here to store patient details

    console.log("Patient registered:", email);
    res.status(200).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
