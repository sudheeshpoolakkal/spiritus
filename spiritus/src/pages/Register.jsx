// src/components/Register/Register.js
import React, { useState, useContext } from 'react';
import { User, Mail, Lock, Phone, Calendar, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Main.scss'; // Ensure the SCSS path is correct

const Register = () => {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your registration logic here.
    // For demonstration, we'll assume registration is successful.
    const { fullName, email } = formData;
    const userData = { name: fullName, email };
    login(userData); // Update global authentication state
    navigate('/'); // Redirect to home page after registration
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 p-4">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-800 rounded-full p-3">
            <User className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-6">CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            icon={<User size={20} />}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<Mail size={20} />}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputFieldWithToggle
            icon={<Lock size={20} />}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            toggleVisibility={togglePasswordVisibility}
            isVisible={passwordVisible}
          />
          <InputFieldWithToggle
            icon={<Lock size={20} />}
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            toggleVisibility={toggleConfirmPasswordVisibility}
            isVisible={confirmPasswordVisible}
          />
          <InputField
            icon={<Phone size={20} />}
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            icon={<Calendar size={20} />}
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
          >
            REGISTER
          </button>
        </form>
        <p className="mt-4 text-center text-blue-100">
          Already have an account? <Link to="/login" className="text-white hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

// InputField Component
const InputField = ({ icon, type, name, placeholder, value, onChange, required }) => (
  <div className="mb-4 relative">
    <div className="absolute top-3 left-3 text-blue-200">{icon}</div>
    <input
      type={type}
      name={name}
      className="w-full bg-transparent border-b border-blue-200 py-2 pl-10 pr-4 text-white placeholder-blue-200 focus:outline-none focus:border-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

// InputFieldWithToggle Component
const InputFieldWithToggle = ({ icon, type, name, placeholder, value, onChange, required, toggleVisibility, isVisible }) => (
  <div className="mb-4 relative">
    <div className="absolute top-3 left-3 text-blue-200">{icon}</div>
    <input
      type={type}
      name={name}
      className="w-full bg-transparent border-b border-blue-200 py-2 pl-10 pr-10 text-white placeholder-blue-200 focus:outline-none focus:border-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    <button
      type="button"
      className="absolute right-3 top-2 text-blue-200 hover:text-white focus:outline-none"
      onClick={toggleVisibility}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
);

export default Register;
