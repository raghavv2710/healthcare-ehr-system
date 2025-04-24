import React, { useEffect, useState } from "react";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/doctor/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <strong>Patient:</strong> {appt.patientName} <br />
              <strong>Date:</strong> {appt.date} | <strong>Time:</strong> {appt.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAppointments;
