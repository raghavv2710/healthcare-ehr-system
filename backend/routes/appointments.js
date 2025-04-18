// backend/routes/appointments.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../authMiddleware"); // ✅ Correct path

let appointments = []; // In-memory storage for demo

// 📌 GET: View user's appointments
router.get("/my", verifyToken, (req, res) => {
  const userAppointments = appointments.filter(app => app.userId === req.user.uid);
  res.json(userAppointments);
});

// DELETE: Cancel user's appointment
router.delete("/:id", verifyToken, (req, res) => {
  const appointmentId = parseInt(req.params.id);  // ensure the ID is an integer
  const index = appointments.findIndex(app => app.id === appointmentId && app.userId === req.user.uid);

  if (index !== -1) {
    appointments.splice(index, 1);
    return res.json({ message: "Appointment canceled." });
  } else {
    return res.status(403).json({ message: "Unauthorized or appointment not found." });
  }
});


// 🆕 POST: Book new appointment
router.post("/book", verifyToken, (req, res) => {
  const { date, time, doctorId } = req.body;

  if (!date || !time || !doctorId) {
    return res.status(400).json({ message: "Date, time, and doctorId are required." });
  }

  // Prevent double-booking
  const alreadyExists = appointments.find(
    (app) => app.userId === req.user.uid && app.date === date && app.time === time
  );

  if (alreadyExists) {
    return res.status(400).json({ message: "You already have an appointment at this time." });
  }

  const newAppointment = {
    id: appointments.length + 1,
    userId: req.user.uid,
    date,
    time,
    doctorId,
  };

  appointments.push(newAppointment);

  return res.status(200).json({
    message: "Appointment booked successfully.",
    appointment: newAppointment,
  });
});

module.exports = router;
