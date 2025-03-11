
import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import { DoctorDashboard } from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import DoctorPrescription from "./pages/Doctor/DoctorPrescription";
import AdminPrescription from "./pages/Admin/AdminPrescription";
import FeedBack from "./pages/Admin/FeedBack";
import DoctorViewPrescription from "./pages/Doctor/DoctorViewPrescription";


const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/*Admin Route*/}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/admin-prescription" element={<AdminPrescription />} />
          <Route path="/feedback" element={<FeedBack />} />

          {/*Doctor Route*/}

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/doctor-prescription" element={<DoctorPrescription />} />
          <Route path="/doctor-view-prescription" element={<DoctorViewPrescription />} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
