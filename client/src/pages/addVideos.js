import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../components/config";
import { useLocation } from "react-router-dom";

const CourseView = () => {
  const [videoDetails, setVideoDetails] = useState([{ title: "", link: "" }]);
  const token = Cookies.get("authToken");
  const userId = Cookies.get("userId");
  const location = useLocation();
  const courseId = location.state?.courseId; // Receive courseId from previous page

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing");
      // Handle missing courseId, e.g., navigate back to the previous page
    }
  }, [courseId]);

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

  const saveVideos = async () => {
    console.log("Course ID:", courseId); // Debugging log
    try {

      const response = await axios.post(
        `${config.API_URL}/courses/${courseId}/videos`,
        { videos: videoDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-Id": userId, // Include userId in the header
          },
        }
      );
      alert("Videos added successfully!");
    } catch (error) {
      console.error("Error saving videos:", error);
      alert("Failed to save videos. Please try again.");
    }
  };

  return (
    <div className="course-view">
      <h1>Manage Videos for Course</h1>
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
      <button onClick={addNewVideoField}>Add New Video</button>
      <button onClick={saveVideos}>Save All Videos</button>
    </div>
  );
};

export default CourseView;
