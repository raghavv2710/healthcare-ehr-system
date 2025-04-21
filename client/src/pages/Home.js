import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Healthcare App</h1>
      <p>Book appointments and manage records easily.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>
    </div>
  );
};

const styles = {
  link: {
    margin: "0 10px",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Home;
