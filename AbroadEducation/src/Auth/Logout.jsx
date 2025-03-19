import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      try {
        // Clear all auth-related data
        localStorage.clear(); // This will remove all localStorage items
        // Or if you prefer to remove specific items:
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Force reload the application to reset all states
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl font-semibold animate-pulse">
        Logging out...
      </div>
    </div>
  )
}

export default Logout