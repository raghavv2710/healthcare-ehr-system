import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
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
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard - Protected Page</h2>
      {userData ? (
        <div>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>UID:</strong> {userData.uid}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
