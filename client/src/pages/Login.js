import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import config from '../components/config';
import Cookies from 'js-cookie';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleForceLogout = async () => {
    try {
      const response = await fetch(`${config.API_URL}/auth/force-logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Logged out from other devices. Please try logging in again.');
      } else {
        const error = await response.json();
        alert(`Force logout failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during force logout:', error);
      alert('Something went wrong!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, userId, role } = await response.json();

        // Store the token and userId in cookies
        Cookies.set('authToken', token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
        Cookies.set('userId', userId, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });

        onLogin({ userId, token });

        // Redirect based on user role
        if (role === 'student') {
          navigate('/dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'teacher') {
          navigate('/course-crud');
        } else {
          alert('Unknown role');
        }
      } else {
        const error = await response.json();
        if (error.message === 'Session already active. Please logout from other devices to login here.') {
          if (window.confirm('Session already active. Do you want to logout from other devices?')) {
            await handleForceLogout();
          }
        } else {
          alert(`Login failed: ${error.message}`);
        }
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <p>Log in to access your courses and learning journey.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary">Log In</button>
      </form>
      <div className="login-footer">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
        <p><a href="/forgot-password">Forgot your password?</a></p>
      </div>
    </div>
  );
};

export default Login;
