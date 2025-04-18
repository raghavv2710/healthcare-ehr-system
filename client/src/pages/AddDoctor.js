// client/src/pages/AddDoctor.js
import React, { useState } from "react";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in as admin first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, specialization }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Doctor added successfully!");
        setName("");
        setSpecialization("");
        console.log("Doctor added:", data.doctor);
      } else {
        setMessage(data.message || "Failed to add doctor.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleAddDoctor}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Doctor</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddDoctor;
