import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>

      {isLoggedIn ? (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/book" style={styles.link}>Book Appointment</Link>
          <Link to="/appointments" style={styles.link}>Appointments</Link>
          {isAdmin && <Link to="/add-doctor" style={styles.link}>Add Doctor</Link>}
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    marginLeft: "auto",
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;
