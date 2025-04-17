// client/src/pages/Dashboard.js (create this)
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Backend user info:", data));
  }, []);

  return <h2>Dashboard - Protected Page</h2>;
};

export default Dashboard;
