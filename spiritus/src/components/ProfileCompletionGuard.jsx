import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProfileCompletionGuard = ({ children }) => {
  const { userData, token } = useContext(AppContext);
  const location = useLocation();

  if (!token || !userData) {
    // If not logged in or user data is not loaded yet, do nothing.
    // Let public routes or login page handle authentication.
    return children;
  }

  // The pages involved in the completion flow.
  const completionFlowPages = [
    '/login',
    '/upload-profile-image',
    '/complete-profile',
    '/questionnaire',
  ];

  // If we are already on a page in the completion flow, don't interfere.
  // This check is a safeguard, the main logic below is more specific.
  if (completionFlowPages.includes(location.pathname)) {
      // More specific checks will handle redirection from these pages if needed.
  }

  const { image, phone, address, dob, gender, questionnaire } = userData;
  const currentPath = location.pathname;

  // Rule 1: If no image, must go to upload page.
  if (!image) {
    if (currentPath !== '/upload-profile-image' && currentPath !== '/login') {
      return <Navigate to="/upload-profile-image" />;
    }
  }
  // Rule 2: If image exists, but profile details are missing, must go to complete profile page.
  else if (!phone || !address || !dob || !gender) {
    if (currentPath !== '/complete-profile' && currentPath !== '/login') {
      return <Navigate to="/complete-profile" />;
    }
  }
  // Rule 3: If image and details exist, but questionnaire is missing, must go to questionnaire page.
  else if (!questionnaire) {
    if (currentPath !== '/questionnaire' && currentPath !== '/login') {
      return <Navigate to="/questionnaire" />;
    }
  }

  // If all checks pass, the profile is complete. Render the requested page.
  return children;
};

export default ProfileCompletionGuard;
