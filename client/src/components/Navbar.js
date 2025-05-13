import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import config from '../components/config';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';  // Correctly import jwtDecode



const Navbar = ({ isLoggedIn, onSignOut, userId }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken); // Debug full token structure
        setUserRole(decodedToken.role || ''); // Fallback to empty string if role is undefined
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserRole('');
      }
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const token = Cookies.get("authToken");
      const userId = Cookies.get("userId");
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const response = await fetch(`${config.API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: String(userId) }) // Send userId as a string
      });

      if (!response.ok) throw new Error('Logout failed');

      Cookies.remove('authToken');
      Cookies.remove('userId');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      onSignOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleDashboardClick = () => {
    console.log('Navigating with role:', userRole); // Debug current role
    if (!isLoggedIn) {
      navigate('/');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (userRole === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/'); // Default to home if role is undefined
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">SK</Link>
        </div>
        <div className="navbar-links">
          <button onClick={handleDashboardClick} className="dashboard-btn">
            {isLoggedIn ? (userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard') : 'Home'}
          </button>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link to={`/profile`}>Profile</Link>
              <button className="sign-out-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
