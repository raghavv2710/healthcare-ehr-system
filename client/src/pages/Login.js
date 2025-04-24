// src/components/auth/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); // Default to "patient"
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role); // Save the selected role
      navigate(`/${role}/dashboard`); // Redirect to the corresponding dashboard
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <div>
          <label>
            <input
              type="radio"
              value="patient"
              checked={role === "patient"}
              onChange={() => setRole("patient")}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              value="doctor"
              checked={role === "doctor"}
              onChange={() => setRole("doctor")}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    textAlign: "center",
  },
  input: {
    margin: "10px",
    padding: "10px",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
