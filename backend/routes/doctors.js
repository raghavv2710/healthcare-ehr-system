const express = require("express");
const router = express.Router();
const verifyToken = require("../authMiddleware");

let doctors = [
  { id: "101", name: "Dr. Meera Iyer", specialization: "Cardiologist" },
  { id: "102", name: "Dr. Arjun Kapoor", specialization: "Dermatologist" },
];

// Get all doctors
router.get("/", (req, res) => {
  res.json(doctors);
});

// Add new doctor (admin-only)
router.post("/", verifyToken, (req, res) => {
  const user = req.user;
  console.log("Authenticated user:", user.email);

  if (user.email !== "raghavv2710@gmail.com") {
    return res.status(403).json({ message: "Only admins can add doctors" });
  }

  const { name, specialization } = req.body;

  if (!name || !specialization) {
    return res.status(400).json({ message: "Name and specialization are required" });
  }

  const newDoctor = {
    id: (doctors.length + 1).toString(),
    name,
    specialization,
  };

  doctors.push(newDoctor);
  console.log("✅ Doctor added:", newDoctor);
  res.status(201).json({ message: "Doctor added", doctor: newDoctor });
});

module.exports = router;
