import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import config from "./config";
import Modal from "react-modal";
import "../styles/courseCRUD.css"; // Import the CSS file

const CourseCRUD = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const token = Cookies.get("authToken");
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  // Fetch All Courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/courses/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId, // Include userId in the header
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token, userId]);

  // Select a Course to View Details
  const viewCourseDetails = async (courseId) => {
    try {
      const response = await axios.get(`${config.API_URL}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId, // Include userId in the header
        },
      });
      setSelectedCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  // Handle Edit Course
  const handleEdit = (course) => {
    setEditMode(true);
    setEditData(course);
    setModalIsOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(`${config.API_URL}/courses/${editData._id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId, // Include userId in the header
        },
      });
      alert("Course updated successfully.");
      setEditMode(false);
      setModalIsOpen(false);
      fetchCourses(); // Refresh the course list
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete Course
  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${config.API_URL}/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": userId, // Include userId in the header
        },
      });
      alert("Course deleted successfully.");
      setCourses(courses.filter((course) => course.courseId !== courseId));
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Navigate to Add Videos Page
  const navigateToVideos = (courseId) => {
    navigate(`/courses/${courseId}/videos`, { state: { courseId } });
  };

  // Navigate to Edit Videos Page
  const navigateToEditVideos = (courseId) => {
    navigate(`/editcoursevideos/${courseId}`, { state: { courseId } });
  };

  // Navigate to Add Course Page
  const navigateToAddCourse = () => {
    navigate("/add-course");
  };

  return (
    <div className="course-crud">
      <h1 className="title">Welcome to Course CRUD Operations</h1>
      <button onClick={navigateToAddCourse}>Add Course</button>
      <h2>Course List</h2>
      {/* Course List */}
      <div className="course-list">
        <table>
          <thead>
            <tr>
              <th>Object ID</th>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Course Details</th>
              <th>Course Duration</th>
              <th>Course Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course._id}</td>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.courseDetails}</td>
                <td>{course.courseDuration}</td>
                <td>{course.courseCost}</td>
                <td>
                  <button onClick={() => viewCourseDetails(course.courseId)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Course Details */}
      {selectedCourse && (
        <div className="course-details">
          <h2>Course Details</h2>
          <p>
            <strong>Object ID:</strong> {selectedCourse._id}
          </p>
          <p>
            <strong>Course ID:</strong> {selectedCourse.courseId}
          </p>
          <p>
            <strong>Course Name:</strong> {selectedCourse.courseName}
          </p>
          <p>
            <strong>Course Details:</strong> {selectedCourse.courseDetails}
          </p>
          <p>
            <strong>Course Duration:</strong> {selectedCourse.courseDuration}
          </p>
          <p>
            <strong>Course Cost:</strong> {selectedCourse.courseCost}
          </p>
          <p>
            <strong>Students Registered:</strong> {selectedCourse.studentsRegistered}
          </p>
          <p>
            <strong>Total Revenue:</strong> {selectedCourse.totalRevenue}
          </p>
          <button onClick={() => handleEdit(selectedCourse)}>Edit Course</button>
          <button onClick={() => navigateToVideos(selectedCourse.courseId)}>Add Videos</button>
          <button onClick={() => navigateToEditVideos(selectedCourse.courseId)}>Edit Videos</button>
          <button onClick={() => deleteCourse(selectedCourse.courseId)}>Delete Course</button>
        </div>
      )}
      {/* Edit Course Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Edit Course</h2>
        <label>Course ID: </label>
        <input name="courseId" value={editData.courseId || ""} onChange={handleEditChange} />
        <label>Course Name: </label>
        <input name="courseName" value={editData.courseName || ""} onChange={handleEditChange} />
        <label>Course Details: </label>
        <input name="courseDetails" value={editData.courseDetails || ""} onChange={handleEditChange} />
        <label>Course Duration: </label>
        <input name="courseDuration" value={editData.courseDuration || ""} onChange={handleEditChange} />
        <label>Course Cost: </label>
        <input name="courseCost" value={editData.courseCost || ""} onChange={handleEditChange} />
        <label>Students Registered: </label>
        <input name="studentsRegistered" value={editData.studentsRegistered || ""} onChange={handleEditChange} />
        <label>Total Revenue: </label>
        <input name="totalRevenue" value={editData.totalRevenue || ""} onChange={handleEditChange} />
        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CourseCRUD;
