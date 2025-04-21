import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // ✅ Initialize Firebase Auth

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      if (!token) throw new Error("Token not generated.");

      localStorage.setItem("token", token);

      // 🔐 Get user role
      const userRes = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userRes.json();

      if (userRes.status !== 200 || !userData.uid) {
        throw new Error("Failed to fetch user info.");
      }

      // 🎯 Redirect based on role
      if (userData.role === "admin") {
        navigate("/add-doctor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.code, err.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
