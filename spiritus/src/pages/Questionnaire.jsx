import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Questionnaire = () => {
  const { backendUrl, token, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    country: '',
    age: '',
    relationshipStatus: '',
    mainConcern: '',
    drug: '',
    suicideIdeation: '',
    medication: ''
  });

  const questions = [
    {
      id: 'country',
      question: 'Which country are you in?',
      type: 'dropdown',
      options: ['India', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Other']
    },
    {
      id: 'age',
      question: 'What is your age range?',
      type: 'radio',
      options: ['Below 18', '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
    },
    {
      id: 'relationshipStatus',
      question: 'What is your relationship status?',
      type: 'radio',
      options: ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed']
    },
    {
      id: 'mainConcern',
      question: 'What brings you to therapy today?',
      type: 'radio',
      options: [
        'Anxiety or stress',
        'Depression or low mood',
        'Relationship issues',
        'Work or school stress',
        'Life transitions',
        'Grief or loss',
        'Self-improvement',
        'Other'
      ]
    },
    {
      id: 'drug',
      question: 'Do you consume drugs?',
      type: 'radio',
      options: ['No', 'Occasionally', "Monthly", 'Weekly','Daily']
    },
    {
      id: 'suicideIdeation',
      question: 'When was the last time you thought about suicide?',
      type: 'radio',
      options: ['Never', 'Recently', 'In the last month', 'Over a month ago', 'Over 6 months ago', 'Over a year ago']
    },
    {
      id: 'medication',
      question: 'Are you currently taking any medication?',
      type: 'radio',
      options: ['No', 'Yes, for mental health', 'Yes, for physical health', 'Yes, for both']
    }
  ];

  const handleChange = (value) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/submit-questionnaire`,
        { answers },
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Thank you for your answers!');
        await loadUserProfileData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.type === 'dropdown' ? (
              <select
                value={currentAnswer}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              >
                <option value="">Select an option</option>
                {currentQuestion.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => handleChange(e.target.value)}
                    className="mr-3 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                !currentAnswer
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isLastStep ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;