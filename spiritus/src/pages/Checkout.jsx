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
    return (
      <div className="text-center mt-10">
        <h1>Error: Appointment not found</h1>
      </div>
    );
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
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Checkout</h1>
        
        {/* Appointment Details */}
        <div className="mb-6 border-b pb-4">
          <p className="text-gray-600 text-sm">
            Appointment ID: <span className="font-semibold text-gray-800">{appointment._id}</span>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Amount to pay: <span className="font-semibold text-gray-800">{currencySymbol}{totalAmount}</span>
          </p>
        </div>

        {/* Payment Method Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`px-4 py-2 mr-2 border-b-2 transition-colors ${paymentMethod === 'card' ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}
          >
            Card
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`px-4 py-2 border-b-2 transition-colors ${paymentMethod === 'upi' ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}
          >
            UPI
          </button>
        </div>

        {paymentMethod === 'card' && (
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                maxLength="16"
                inputMode="numeric"
                pattern="\d*"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  setCardNumber(e.target.value);
                }}
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cardNumber}
                placeholder="1234123412341234"
                required
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                <input
                  type="text"
                  maxLength="5"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9\/]/g, '');
                    setExpiry(e.target.value);
                  }}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={expiry}
                  placeholder="08/24"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  maxLength="3"
                  inputMode="numeric"
                  pattern="\d*"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                    setCvv(e.target.value);
                  }}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cvv}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            >
              {loading ? 'Processing...' : 'Submit Payment'}
            </button>
          </form>
        )}

        {paymentMethod === 'upi' && (
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#0D8845] text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            >
              {loading ? 'Processing...' : 'Submit Payment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
