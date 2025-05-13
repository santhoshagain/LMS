import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/course.css';
import config from '../components/config'; // Import the config file

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // API call for fetching courses data
    const fetchCourses = async () => {
      try {
        // Use the base URL from config and append the endpoint
        const response = await fetch(`${config.API_URL}/courses/view`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      <h2>Explore Our Courses</h2>
      <p>Enhance your skills with our comprehensive and engaging courses.</p>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <Link to={`/courses/${course.courseId}`}>
                <img 
                  src={`${config.API_URL}/uploads/${course.courseId}.${course.courseImage ? course.courseImage.split('.').pop() : 'jpg'}`} 
                  alt={course.courseName} 
                  className="course-image" 
                />
              </Link>
              <h3>{course.courseName}</h3> {/* Display course name */}
              <p>{course.courseDetails}</p> {/* Display course details */}
              {/* Link to course detail page, passing the MongoDB _id as a URL parameter */}
              <Link to={`/courses/${course.courseId}`} className="btn-secondary">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="no-courses">No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
