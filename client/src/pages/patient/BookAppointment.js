// client/src/pages/BookAppointment.js

import React, { useState, useEffect } from "react";

const BookAppointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);

  // ✅ Fetch list of doctors from backend when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("❌ Failed to fetch doctors:", error);
        alert("Failed to fetch doctors.");
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Handles form submission to book appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // 🔐 Get token from localStorage

    if (!token) {
      alert("Please log in first.");
      return;
    }

    const appointmentData = { date, time, doctorId };

    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 Attach token to Authorization header
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Appointment booked successfully!");
        console.log("📅 Appointment data:", data);
        setDate("");
        setTime("");
        setDoctorId("");
      } else {
        alert("❌ Error booking appointment: " + data.message);
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label>Time:</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <label>Select Doctor:</label>
      <select
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        required
      >
        <option value="">Select a doctor</option>
        {doctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name} ({doc.specialization})
          </option>
        ))}
      </select>

      <br /><br />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookAppointment;
