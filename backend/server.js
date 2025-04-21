const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Add this before your routes
app.use(cors({
  origin: "http://localhost:3000", // or "*" for all origins in dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Healthcare Backend is running!");
});

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
