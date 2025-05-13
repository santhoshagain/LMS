import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import the js-cookie library for managing cookies
import config from "./config"; // Import the config file

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    courseDetails: "",
    courseDuration: "",
    courseCost: "",
    courseImg: null,
  });
  const [videoDetails, setVideoDetails] = useState([{ title: "", link: "" }]);
  const token = Cookies.get("authToken");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCourseData({
      ...courseData,
      [name]: files ? files[0] : value,
    });
  };

  const handleVideoChange = (index, field, value) => {
    const updatedDetails = [...videoDetails];
    updatedDetails[index][field] = value;
    setVideoDetails(updatedDetails);
  };

  const addNewVideoField = () => {
    setVideoDetails([...videoDetails, { title: "", link: "" }]);
  };

  const removeVideoField = (index) => {
    const updatedDetails = videoDetails.filter((_, i) => i !== index);
    setVideoDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const formData = new FormData();
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    try {
      await axios.post(
        `${config.API_URL}/courses/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.post(
        `${config.API_URL}/courses/${courseData.courseId}/videos`,
        { videos: videoDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course and videos added successfully!");
      setCourseData({
        courseId: "",
        courseName: "",
        courseDetails: "",
        courseDuration: "",
        courseCost: "",
        courseImg: null,
      });
      setVideoDetails([{ title: "", link: "" }]);
    } catch (error) {
      console.error("Error adding course and videos:", error);
      alert("Failed to add course and videos. Please try again.");
    }
  };

  return (
    <div className="add-course">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Course ID:</label>
        <input
          type="text"
          name="courseId"
          value={courseData.courseId}
          onChange={handleChange}
          required
        />

        <label>Course Name:</label>
        <input
          type="text"
          name="courseName"
          value={courseData.courseName}
          onChange={handleChange}
          required
        />

        <label>Course Details:</label>
        <textarea
          name="courseDetails"
          value={courseData.courseDetails}
          onChange={handleChange}
          required
        ></textarea>

        <label>Course Duration:</label>
        <input
          type="text"
          name="courseDuration"
          value={courseData.courseDuration}
          onChange={handleChange}
          required
        />

        <label>Course Cost:</label>
        <input
          type="number"
          name="courseCost"
          value={courseData.courseCost}
          onChange={handleChange}
          required
        />

        <label>Course Image:</label>
        <input
          type="file"
          name="courseImg"
          onChange={handleChange}
          required
        />

        <h2>Manage Videos for Course</h2>
        {videoDetails.map((video, index) => (
          <div key={index} className="video-entry">
            <label>Video Title:</label>
            <input
              type="text"
              value={video.title}
              onChange={(e) => handleVideoChange(index, "title", e.target.value)}
              placeholder="Enter video title"
            />
            <label>Video Link:</label>
            <input
              type="text"
              value={video.link}
              onChange={(e) => handleVideoChange(index, "link", e.target.value)}
              placeholder="Enter video link"
            />
            {index > 0 && (
              <button onClick={() => removeVideoField(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addNewVideoField}>Add New Video</button>
        <button type="submit">Add Course and Videos</button>
      </form>
    </div>
  );
};

export default AddCourse;
