import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  // Log để debug
  console.log('Protected Route Check:', { isLoggedIn, userRole, requiredRole });

  if (!isLoggedIn) {
    console.log('User not logged in, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('User does not have required role, redirecting to home');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 