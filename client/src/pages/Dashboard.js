// client/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.uid) {
          setUserData(data);
          console.log("Backend user info:", data);
        } else {
          alert("Failed to fetch user data.");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        alert("An error occurred while fetching user info.");
      });
  }, []);

  return (
    <div>
      <h2>Dashboard - Protected Page</h2>
      {userData ? (
        <div>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>UID:</strong> {userData.uid}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
