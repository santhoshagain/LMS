import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import Cookies from 'js-cookie';
import config from '../components/config';

const Dashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken');
    const userId = Cookies.get('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch(`${config.API_URL}/users/purchasedcourses`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'userId': userId,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch purchased courses');
        }

        const data = await response.json();
        const courseDetailsPromises = data.courses.map(courseId => 
          fetch(`${config.API_URL}/courses/${courseId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).then(res => {
            if (!res.ok) throw new Error('Failed to fetch course details');
            return res.json();
          })
        );

        const courseDetails = await Promise.all(courseDetailsPromises);
        setPurchasedCourses(courseDetails);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setError(error.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [navigate]);

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="dashboard-container">
      <h2>Your Purchased Courses</h2>

      {loading ? (
        <p>Loading your courses...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="courses-list">
          {purchasedCourses.length === 0 ? (
            <p>You have not purchased any courses yet.</p>
          ) : (
            purchasedCourses.map((course) => (
              <div className="course-card" key={course.courseId}>
                <img 
                  src={`${config.API_URL}/uploads/${course.courseId}.${course.courseImage ? course.courseImage.split('.').pop() : 'jpg'}`} 
                  alt={course.courseName} 
                  className="course-img" 
                />
                <div className="course-info">
                  <h3>{course.courseName}</h3>
                  <p>{course.courseDetails}</p>
                  <p><strong>Duration:</strong> {course.courseDuration} hours</p>
                  <button 
                    className="btn-primary" 
                    onClick={() => handleViewCourse(course.courseId)}
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;