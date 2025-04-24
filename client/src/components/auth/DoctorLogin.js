// src/components/auth/DoctorLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      const userRes = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userRes.json();

      if (userData.role !== "doctor") {
        alert("Access denied: You are not registered as a doctor.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", userData.role);
      navigate("/doctor/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h2>Doctor Login</h2>
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
        {loading ? "Logging in..." : "Login"}
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

export default DoctorLogin;
