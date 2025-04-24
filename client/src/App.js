import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Corrected Login import path
import Login from "./pages/Login"; 

import AdminDashboard from "./pages/admin/Dashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewAppointments from "./pages/doctor/ViewAppointments";
import DoctorDashboard from "./pages/doctor/Dashboard";
import PatientDashboard from "./pages/patient/Dashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import Appointments from "./pages/patient/Appointments";

import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Components
import DoctorLogin from "./components/auth/DoctorLogin";
import PatientLogin from "./components/auth/PatientLogin";
import PatientRegister from "./components/auth/PatientRegister";
import RoleSelector from "./components/auth/RoleSelector";

function App() {
  // const role = localStorage.getItem("role");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<RoleSelector />} />
        <Route path="/login" element={<Login />} /> {/* This is the login route for both doctors and patients */}

        {/* Role-specific Auth Routes */}
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/register/patient" element={<PatientRegister />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-doctor"
          element={
            <ProtectedRoute roleRequired="admin">
              <AddDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute roleRequired="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute roleRequired="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/view-appointments"
          element={
            <ProtectedRoute roleRequired="doctor">
              <ViewAppointments />
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute roleRequired="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute roleRequired="patient">
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute roleRequired="patient">
              <Appointments />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
