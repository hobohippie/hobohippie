import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useAuth } from '../../context/AuthContext'; // Adjust the path as needed

const ProtectedRoute = ({ element }) => {
  const { user, isAdmin } = useAuth(); // isAdmin is a boolean, not a function

  // If the user is authenticated and is an admin, return the element, otherwise redirect to login
  return user && isAdmin ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
