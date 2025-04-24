// client/src/pages/Appointments.js
import React, { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to view your appointments.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/appointments/my", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          console.error("❌ Failed to fetch appointments:", data.message);
          alert("Failed to fetch appointments.");
        }
      } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        alert("An error occurred while fetching appointments.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
