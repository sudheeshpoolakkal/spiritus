import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorSlots = () => {
  const { doctorSlots, getDoctorSlots, updateDoctorSlots, deleteDoctorSlots } = useContext(DoctorContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate next 30 days for date selection
  const getNext30Days = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Use DD_MM_YYYY format to match slots_booked
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateString = `${day}_${month}_${year}`;
      
      dates.push({
        value: dateString,
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  // Generate time slots (9 AM to 9 PM, 30-minute intervals) in 12-hour format
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 21 && minute > 0) break; // Stop at 9:00 PM
        
        // Create time in 12-hour AM/PM format to match slots_booked
        const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time24}`).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        
        slots.push({ value: displayTime, label: displayTime });
      }
    }
    return slots;
  };

  const availableTimeSlots = generateTimeSlots();
  const next30Days = getNext30Days();

  useEffect(() => {
    getDoctorSlots();
  }, []);

  useEffect(() => {
    if (selectedDate && doctorSlots[selectedDate]) {
      setTimeSlots(doctorSlots[selectedDate]);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, doctorSlots]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewSlot("");
  };

  const addTimeSlot = () => {
    if (!newSlot) {
      toast.error("Please select a time slot");
      return;
    }

    if (timeSlots.includes(newSlot)) {
      toast.error("This time slot already exists");
      return;
    }

    // Sort slots chronologically
    const updatedSlots = [...timeSlots, newSlot].sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a}`);
      const timeB = new Date(`2000-01-01 ${b}`);
      return timeA - timeB;
    });
    
    setTimeSlots(updatedSlots);
    setNewSlot("");
  };

  const removeTimeSlot = (slotToRemove) => {
    const updatedSlots = timeSlots.filter(slot => slot !== slotToRemove);
    setTimeSlots(updatedSlots);
  };

  const saveSlots = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setLoading(true);
    const success = await updateDoctorSlots(selectedDate, timeSlots);
    setLoading(false);

    if (success) {
      toast.success("Slots updated successfully!");
    }
  };

  const deleteAllSlots = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (window.confirm("Are you sure you want to delete all slots for this date?")) {
      setLoading(true);
      const success = await deleteDoctorSlots(selectedDate);
      setLoading(false);

      if (success) {
        setTimeSlots([]);
        toast.success("All slots deleted successfully!");
      }
    }
  };

  // Convert DD_MM_YYYY to readable format
  const formatDateDisplay = (dateString) => {
    const [day, month, year] = dateString.split('_');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">Manage Appointment Slots</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a date...</option>
              {next30Days.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>

          {selectedDate && (
            <>
              {/* Add New Slot */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Time Slot
                </label>
                <div className="flex gap-3">
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select time...</option>
                    {availableTimeSlots
                      .filter(slot => !timeSlots.includes(slot.value))
                      .map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={addTimeSlot}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add Slot
                  </button>
                </div>
              </div>

              {/* Current Slots */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Current Slots for {formatDateDisplay(selectedDate)}
                  </h3>
                  {timeSlots.length > 0 && (
                    <button
                      onClick={deleteAllSlots}
                      disabled={loading}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      Delete All
                    </button>
                  )}
                </div>

                {timeSlots.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No slots available for this date</p>
                    <p className="text-sm">Add slots using the form above</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <span className="text-sm font-medium text-green-800">
                          {slot}
                        </span>
                        <button
                          onClick={() => removeTimeSlot(slot)}
                          className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                          aria-label="Remove slot"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              {timeSlots.length > 0 && (
                <div className="border-t pt-6">
                  <button
                    onClick={saveSlots}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none" />
                          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Slots'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Existing Slots Overview */}
      {Object.keys(doctorSlots).length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Slots Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(doctorSlots)
                .sort(([dateA], [dateB]) => {
                  // Sort by DD_MM_YYYY format
                  const [dayA, monthA, yearA] = dateA.split('_').map(Number);
                  const [dayB, monthB, yearB] = dateB.split('_').map(Number);
                  const dateObjA = new Date(yearA, monthA - 1, dayA);
                  const dateObjB = new Date(yearB, monthB - 1, dayB);
                  return dateObjA - dateObjB;
                })
                .map(([date, slots]) => (
                  <div key={date} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {formatDateDisplay(date)}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {slots.map((slot, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                      {slots.length} slot{slots.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSlots;