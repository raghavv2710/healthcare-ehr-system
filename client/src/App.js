import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import AddDoctor from "./pages/AddDoctor";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
