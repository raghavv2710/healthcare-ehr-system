import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    // Update token and role when route changes
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/auth");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>

      {!token && (
        <>
          <Link to="/auth" style={styles.link}>Login / Register</Link>
        </>
      )}


      {token && role === "admin" && (
        <>
          <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/admin/AddDoctor" style={styles.link}>Add Doctor</Link>
          <Link to="/admin/manage-users" style={styles.link}>Manage Users</Link>
        </>
      )}

      {token && role === "doctor" && (
        <>
          <Link to="/doctor/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/doctor/view-appointments" style={styles.link}>View Appointments</Link>
        </>
      )}

      {token && role === "patient" && (
        <>
          <Link to="/patient/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/patient/book-appointment" style={styles.link}>Book Appointment</Link>
          <Link to="/patient/appointments" style={styles.link}>Appointments</Link>
        </>
      )}

      {token && (
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    padding: "10px",
    background: "#0077cc",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logoutButton: {
    marginLeft: "auto",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
