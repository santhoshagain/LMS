import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/courseDetail.css';
import config from '../components/config';
import Cookies from 'js-cookie'; // Import js-cookie

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get('authToken'); // Get token from cookies
  const userId = Cookies.get('userId'); // Get userId from cookies

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${config.API_URL}/courses/${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch course details');
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch(`${config.API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'userId': userId,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch purchased courses');
        const data = await response.json();
        setPurchasedCourses(data.purchasedCourses);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    fetchCourse();
    fetchPurchasedCourses();
  }, [courseId]);

  const handleBuyNow = () => {
    navigate(`/payment/${courseId}`);
  };

  const handleViewCourse = () => {
    navigate(`/coursevideos/${courseId}`);
  };

  if (!course) {
    return <div className="course-detail-loading">Loading course details...</div>;
  }

  const isPurchased = purchasedCourses.includes(courseId);

  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <img 
          src={`${config.API_URL}/uploads/${course.courseId}.${course.courseImage ? course.courseImage.split('.').pop() : 'jpg'}`} 
          alt={course.courseName} 
          className="course-img" 
        />
        <div className="course-info">
          <h2>{course.courseName}</h2>
          <p>{course.courseDetails}</p>
          <p><strong>Duration:</strong> {course.courseDuration}</p>
          <p><strong>Cost:</strong> ${course.courseCost}</p>
          <p><strong>Students Registered:</strong> {course.studentsRegistered}</p>
          {isPurchased ? (
            <button className="btn-primary" onClick={handleViewCourse}>View Course</button>
          ) : (
            <button className="btn-primary" onClick={handleBuyNow}>Buy Now</button>
          )}
        </div>
      </div>
      <div className="course-videos">
        <h3>Video List</h3>
        {course.videoDetails && course.videoDetails.length > 0 ? (
          <ul>
            {course.videoDetails.map((video, index) => (
              <li key={index}>
                {index + 1}. {video.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
