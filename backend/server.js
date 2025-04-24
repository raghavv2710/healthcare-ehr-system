const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // adjust this in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json()); // Parse incoming JSON requests

// Firebase Admin SDK Init (ensure this is set up in firebase.js)
require("./firebase");

// Routes
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Healthcare Backend is running!");
});

// Server start
app.listen(port, () => {
  console.log(`✅ Backend running at: http://localhost:${port}`);
});
