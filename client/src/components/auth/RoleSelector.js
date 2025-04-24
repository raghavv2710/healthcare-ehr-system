import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Select Your Role</h2>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/login/doctor")}>
          Doctor Login
        </button>
        <button style={styles.button} onClick={() => navigate("/login/patient")}>
          Patient Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "50px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RoleSelector;
