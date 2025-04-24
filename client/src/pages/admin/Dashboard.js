// src/pages/admin/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/add-doctor">Add Doctor</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
