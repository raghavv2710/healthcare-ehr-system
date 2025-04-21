import React, { useState } from "react";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in as an admin first.");
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
        setMessage("✅ Doctor added successfully!");
        setName("");
        setSpecialization("");
        console.log("Doctor added:", data.doctor);
      } else {
        console.warn("Add doctor failed:", data);
        setMessage(`❌ ${data.message || "Failed to add doctor."}`);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("❌ An unexpected error occurred.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleAddDoctor}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Doctor
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default AddDoctor;
