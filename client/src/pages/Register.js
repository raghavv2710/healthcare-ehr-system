// client/src/pages/Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Make sure this path is correct

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    console.log("Attempting to register:", email, password); // ✅ Debug log
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();
      localStorage.setItem("token", token);
  
      await fetch("http://localhost:5000/api/auth/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "patient" }),
      });
  
      alert("✅ Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err);
  
      // 🔐 Friendly error handling
      if (err.code === "auth/email-already-in-use") {
        alert("❌ Email is already in use. Try logging in or using a different email.");
      } else if (err.code === "auth/invalid-email") {
        alert("❌ Invalid email format.");
      } else if (err.code === "auth/weak-password") {
        alert("❌ Password should be at least 6 characters.");
      } else {
        alert("❌ Registration failed. Try a different email or password.");
      }
    }
  };  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
