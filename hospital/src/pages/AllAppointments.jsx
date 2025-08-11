import React, { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../context/HospitalContext";
import axios from "axios";

const AllAppointments = () => {
  const { backendUrl, hToken } = useContext(HospitalContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/appointments", {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>{appt.userData.name}</TableCell>
                <TableCell>{appt.docData.name}</TableCell>
                <TableCell>{appt.slotDate}</TableCell>
                <TableCell>{appt.slotTime}</TableCell>
                <TableCell>
                  {appt.cancelled ? "Cancelled" : appt.isCompleted ? "Completed" : "Pending"}
                </TableCell>
                <TableCell>{appt.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllAppointments;