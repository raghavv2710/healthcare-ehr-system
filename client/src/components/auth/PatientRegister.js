// src/components/auth/PatientRegister.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const PatientRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      // Register user as patient in backend
      const response = await fetch("http://localhost:5000/api/auth/register-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.status !== 200) {
        throw new Error("Registration failed on server.");
      }

      alert("Patient registered successfully. You can now login.");
      navigate("/login/patient");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} style={styles.form}>
      <h2>Patient Registration</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    background: "#0077cc",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default PatientRegister;
