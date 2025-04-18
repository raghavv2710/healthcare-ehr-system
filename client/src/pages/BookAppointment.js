import React, { useState } from "react";

const BookAppointment = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    const appointmentData = {
      date,
      time,
      doctorId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Appointment booked successfully!");
        console.log("Appointment data:", data);
      } else {
        alert("Error booking appointment:", data.message);
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        required
      />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookAppointment;
