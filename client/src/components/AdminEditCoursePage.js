import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AdminEditCoursePage.css";

const AdminEditCoursePage = ({ token, userId }) => {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "User-Id": userId,
            },
          }
        );
        setCourse(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details");
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, token, userId]);

  // Handle input changes for video titles and links
  const handleInputChange = (index, field, value) => {
    const updatedVideos = [...course.videoDetails];
    updatedVideos[index][field] = value;

    setCourse((prev) => ({
      ...prev,
      videoDetails: updatedVideos,
    }));
  };

  // Move video up in the list
  const moveUp = (index) => {
    if (index === 0) return; // Can't move the first item up

    const updatedVideos = [...course.videoDetails];
    [updatedVideos[index - 1], updatedVideos[index]] = [
      updatedVideos[index],
      updatedVideos[index - 1],
    ];

    setCourse((prev) => ({
      ...prev,
      videoDetails: updatedVideos,
    }));
  };

  // Move video down in the list
  const moveDown = (index) => {
    if (index === course.videoDetails.length - 1) return; // Can't move the last item down

    const updatedVideos = [...course.videoDetails];
    [updatedVideos[index], updatedVideos[index + 1]] = [
      updatedVideos[index + 1],
      updatedVideos[index],
    ];

    setCourse((prev) => ({
      ...prev,
      videoDetails: updatedVideos,
    }));
  };

  // Delete a video from the list
  const deleteVideo = (index) => {
    const updatedVideos = course.videoDetails.filter((_, i) => i !== index);

    setCourse((prev) => ({
      ...prev,
      videoDetails: updatedVideos,
    }));
  };

  // Save changes to the backend
  const saveChanges = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/courses/${courseId}`,
        {
          videoDetails: course.videoDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-Id": userId,
          },
        }
      );
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-edit-course">
      <h2>Edit Videos for Course: {course.courseName}</h2>
      <div className="video-list">
        {course.videoDetails.map((video, index) => (
          <div className="video-item" key={index}>
            <input
              type="text"
              value={video.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
              placeholder="Video Title"
            />
            <input
              type="text"
              value={video.link}
              onChange={(e) =>
                handleInputChange(index, "link", e.target.value)
              }
              placeholder="Video Link"
            />
            <div className="video-controls">
              <button onClick={() => moveUp(index)} disabled={index === 0}>
                Up
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === course.videoDetails.length - 1}
              >
                Down
              </button>
              <button onClick={() => deleteVideo(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="save-btn" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default AdminEditCoursePage;
