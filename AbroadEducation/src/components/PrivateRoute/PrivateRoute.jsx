import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem('token'); // or any other auth check method

  return isAuthenticated ? children : <Navigate to="/Conditions" />;
};

export default PrivateRoute;