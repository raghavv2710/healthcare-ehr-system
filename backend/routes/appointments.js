const express = require("express");
const router = express.Router();
const verifyToken = require("../authMiddleware");

let appointments = []; // In-memory storage for simplicity

// View own appointments
router.get("/my", verifyToken, (req, res) => {
  const userAppointments = appointments.filter(app => app.userId === req.user.uid);
  res.json(userAppointments);
});

// Cancel appointment
router.delete("/:id", verifyToken, (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const index = appointments.findIndex(app => app.id === appointmentId && app.userId === req.user.uid);

  if (index !== -1) {
    appointments.splice(index, 1);
    res.json({ message: "Appointment canceled." });
  } else {
    res.status(403).json({ message: "Unauthorized or not found" });
  }
});

// Book appointment
router.post("/book", verifyToken, async (req, res) => {
  const { date, time, doctorId } = req.body;

  // Log token and user info (for debugging)
  console.log("Received token:", req.headers.authorization);
  console.log("Decoded user:", req.user); // Decoded user info from verifyToken middleware

  // Check if the required data is present
  if (!date || !time || !doctorId) {
    return res.status(400).json({ message: "Date, time, and doctorId are required" });
  }

  // Check for existing appointment at the same time
  const existingAppointment = appointments.find(
    (app) => app.userId === req.user.uid && app.date === date && app.time === time
  );
  if (existingAppointment) {
    return res.status(400).json({ message: "You already have an appointment at this time" });
  }

  // Book the appointment (for now, just add to in-memory array)
  const newAppointment = {
    id: appointments.length + 1,  // Simple id generation for this demo
    userId: req.user.uid,
    date,
    time,
    doctorId,
  };

  appointments.push(newAppointment);

  console.log("New appointment booked:", newAppointment); // Log the new appointment for debugging

  try {
    // Send the response back to the client
    res.status(200).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("Failed to book appointment:", err);
    res.status(500).json({ message: "Failed to book appointment" });
  }
});

module.exports = router;
