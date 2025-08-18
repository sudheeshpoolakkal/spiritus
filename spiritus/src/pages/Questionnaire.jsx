import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Questionnaire = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
  });

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/submit-questionnaire`,
        { answers },
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Thank you for your answers!');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Tell us more about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question1" className="block text-sm font-medium text-gray-700">
              What are you looking for in a therapist?
            </label>
            <textarea
              id="question1"
              name="question1"
              value={answers.question1}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="question2" className="block text-sm font-medium text-gray-700">
              What are your preferred therapy approaches?
            </label>
            <input
              type="text"
              id="question2"
              name="question2"
              value={answers.question2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="question3" className="block text-sm font-medium text-gray-700">
              Is there anything else you would like to share?
            </label>
            <textarea
              id="question3"
              name="question3"
              value={answers.question3}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;
