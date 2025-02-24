// src/pages/Checkout.jsx
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '@/context/AppContext';

const Checkout = () => {
  const { backendUrl, token, currencySymbol } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the appointment object passed from MyAppointments
  const { appointment } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'

  // Dummy state for Card details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Dummy state for UPI details
  const [upiId, setUpiId] = useState('');

  if (!appointment) {
    toast.error("Appointment details not found.");
    return <div className="text-center mt-10"><h1>Error: Appointment not found</h1></div>;
  }

  // Calculate total amount with 16% extra
  const baseAmount = Number(appointment.amount);
  const surcharge = baseAmount * 0.16;
  const totalAmount = (baseAmount + surcharge).toFixed(2);

  // Validate card details
  const validateCardDetails = () => {
    if (!cardName.trim()) {
      toast.error("Please enter a valid name on card");
      return false;
    }
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      toast.error("Please enter expiry in MM/YY format");
      return false;
    }
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  // Validate UPI details
  const validateUpiDetails = () => {
    const upiRegex = /^[\w.-]+@[a-zA-Z]{2,}$/;
    if (!upiRegex.test(upiId)) {
      toast.error("Please enter a valid UPI ID (e.g., username@bank)");
      return false;
    }
    return true;
  };

  // Handler for form submission
  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate inputs based on payment method
    if (paymentMethod === 'card' && !validateCardDetails()) {
      return;
    }
    if (paymentMethod === 'upi' && !validateUpiDetails()) {
      return;
    }

    setLoading(true);
    try {
      // Call your dummy payment endpoint (processPayment in userController.js)
      const { data } = await axios.post(
        `${backendUrl}/api/user/process-payment`,
        { appointmentId: appointment._id },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        // After a short delay, navigate back to MyAppointments so it refreshes and shows "Paid"
        setTimeout(() => {
          navigate('/my-appointments');
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment processing failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow">
      <h1 className="text-2xl font-semibold text-center mb-4">Checkout</h1>
      
      {/* Display appointment details including amount with surcharge */}
      <div className="mb-4 text-center">
        <p>
          Appointment ID: <span className="font-bold">{appointment._id}</span>
        </p>
        <p>
          Amount to pay: <span className="font-bold">{currencySymbol}{totalAmount}</span>
        </p>
       
      </div>

      {/* Payment Method Selection */}
      <div className="flex justify-center mb-4">
        <label className="mr-6">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="ml-2">Card</span>
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="ml-2">UPI</span>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Name on Card</label>
            <input
              type="text"
              className="border w-full p-2 rounded"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              className="border w-full p-2 rounded"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">Expiry (MM/YY)</label>
              <input
                type="text"
                className="border w-full p-2 rounded"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">CVV</label>
              <input
                type="text"
                className="border w-full p-2 rounded"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            {loading ? 'Processing...' : 'Submit Payment'}
          </button>
        </form>
      )}

      {paymentMethod === 'upi' && (
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="block text-sm font-medium">UPI ID</label>
            <input
              type="text"
              className="border w-full p-2 rounded"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            {loading ? 'Processing...' : 'Submit Payment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
