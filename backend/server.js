//backend/server.js
const express = require("express");
const cors = require("cors");
const appointmentsRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const admin = require("./firebase");  // Firebase admin SDK
const verifyToken = require("./authMiddleware");  // Your token verification middleware

const app = express();
const PORT = 5000;

app.use("/api/doctors", doctorRoutes);
app.use(cors());
app.use(express.json());

// Route middleware for verifying token
app.use("/api/appointments", verifyToken, appointmentsRoutes); // Apply the middleware to appointment routes

app.get("/", (req, res) => {
  res.send("Healthcare Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
