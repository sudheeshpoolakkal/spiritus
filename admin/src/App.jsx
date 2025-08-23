import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import AddHospital from "./pages/Admin/AddHospital"; // New import
import DoctorsList from "./pages/Admin/DoctorsList";
import AdminPrescription from "./pages/Admin/AdminPrescription";
import FeedBack from "./pages/Admin/FeedBack";
import DoctorRegistrations from "./pages/Admin/DoctorRegistrations";
import HospitalRegistrations from "./pages/Admin/HospitalRegistrations";
import AssignDoctor from "./pages/Admin/AssignDoctor";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorPrescription from "./pages/Doctor/DoctorPrescription";
import DoctorViewPrescription from "./pages/Doctor/DoctorViewPrescription";
import DoctorSlots from "./pages/Doctor/DoctorSlots";

const ProtectedAdminRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);
  return aToken ? children : <Navigate to="/login" replace />;
};

const ProtectedDoctorRoute = ({ children }) => {
  const { dToken } = useContext(DoctorContext);
  return dToken ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      {aToken || dToken ? (
        <>
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} replace />} />

              {/* Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/all-appointments"
                element={
                  <ProtectedAdminRoute>
                    <AllAppointments />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/add-doctor"
                element={
                  <ProtectedAdminRoute>
                    <AddDoctor />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/add-hospital"
                element={
                  <ProtectedAdminRoute>
                    <AddHospital />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/doctor-list"
                element={
                  <ProtectedAdminRoute>
                    <DoctorsList />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin-prescription"
                element={
                  <ProtectedAdminRoute>
                    <AdminPrescription />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <ProtectedAdminRoute>
                    <FeedBack />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/doctor-registrations"
                element={
                  <ProtectedAdminRoute>
                    <DoctorRegistrations />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/hospital-registrations"
                element={
                  <ProtectedAdminRoute>
                    <HospitalRegistrations />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/assign-doctor"
                element={
                  <ProtectedAdminRoute>
                    <AssignDoctor />
                  </ProtectedAdminRoute>
                }
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor-dashboard"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorDashboard />
                  </ProtectedDoctorRoute>
                }
              />
              <Route
                path="/doctor-appointments"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorAppointments />
                  </ProtectedDoctorRoute>
                }
              />
              <Route
                path="/doctor-profile"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorProfile />
                  </ProtectedDoctorRoute>
                }
              />
              <Route
                path="/doctor-prescription"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorPrescription />
                  </ProtectedDoctorRoute>
                }
              />
              <Route
                path="/doctor-view-prescription"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorViewPrescription />
                  </ProtectedDoctorRoute>
                }
              />
              <Route
                path="/doctor-slots"
                element={
                  <ProtectedDoctorRoute>
                    <DoctorSlots />
                  </ProtectedDoctorRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;