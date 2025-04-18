const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const appointmentRoutes = require("./routes/appointments");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/appointments", appointmentRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
