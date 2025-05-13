import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/SDashboard';
import AddCourse from './components/AddCourse';
import Profile from './components/Profile';
import PaymentPage from './components/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import CourseCRUD from './components/courseCRUD';
import UserCRUD from './components/userCRUD';
import AddVideos from './pages/addVideos';
import CourseVideoPage from './components/CourseVideoPage';
import AdminEditCoursePage from './components/AdminEditCoursePage';
import './App.css'; // Global styles

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    Cookies.remove('authToken');
    Cookies.remove('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment/:courseId" element={<PaymentPage />} />
            <Route path="/coursevideos/:courseId" element={<CourseVideoPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/course-crud" element={<CourseCRUD />} />
            <Route path="/user-crud" element={<UserCRUD />} />
            <Route path="/courses/:courseId/videos" element={<AddVideos />} />
            <Route path="/editcoursevideos/:courseId" element={<AdminEditCoursePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
