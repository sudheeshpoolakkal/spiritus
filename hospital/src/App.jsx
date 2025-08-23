import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HospitalContext } from "./context/HospitalContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import HospitalDashboard from "./pages/HospitalDashboard";
import AllAppointments from "./pages/AllAppointments";
import Home from "./pages/Home";
import HospitalProfile from "./pages/HospitalProfile";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";

const ProtectedHospitalRoute = ({ children }) => {
  const { hToken } = useContext(HospitalContext);
  return hToken ? children : <Navigate to="/hospital-login" replace />;
};

const App = () => {
  const { hToken } = useContext(HospitalContext);

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      {hToken ? (
        <>
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/hospital-dashboard" replace />}
              />
              <Route
                path="/hospital-dashboard"
                element={
                  <ProtectedHospitalRoute>
                    <HospitalDashboard />
                  </ProtectedHospitalRoute>
                }
              />
              <Route
                path="/all-appointments"
                element={
                  <ProtectedHospitalRoute>
                    <AllAppointments />
                  </ProtectedHospitalRoute>
                }
              />
              <Route
                path="/hospital-profile"
                element={
                  <ProtectedHospitalRoute>
                    <HospitalProfile />
                  </ProtectedHospitalRoute>
                }
              />
              <Route
                path="/doctors"
                element={
                  <ProtectedHospitalRoute>
                    <Doctors />
                  </ProtectedHospitalRoute>
                }
              />
              <Route
                path="/add-doctor"
                element={
                  <ProtectedHospitalRoute>
                    <AddDoctor />
                  </ProtectedHospitalRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedHospitalRoute>
                    <Home />
                  </ProtectedHospitalRoute>
                }
              />
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/hospital-login" element={<Login />} />
          <Route path="*" element={<Navigate to="/hospital-login" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
