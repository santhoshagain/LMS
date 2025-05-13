import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Replaced useHistory with useNavigate
import "../styles/CourseVideoPage.css";
import Cookies from 'js-cookie';
import config from "./config";

const CourseVideoPage = () => {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate
  const [videoList, setVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
const token = Cookies.get('authToken');

  useEffect(() => {
    const checkUserAccess = async () => {
      try {
        const response = await fetch(`${config.API_URL}/users/purchasedcourses`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user courses");
        const data = await response.json();
        const purchasedCourses = data.courses || []; // Correct property access
        if (!purchasedCourses.includes(courseId)) {
          navigate(`/payment/${courseId}`);
        }
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await fetch(`${config.API_URL}/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch course details");
        const data = await response.json();
        if (data.videoDetails && data.videoDetails.length > 0) {
          setVideoList(data.videoDetails);
          setCurrentVideo(data.videoDetails[0]);
        } else {
          setVideoList([]);
          setCurrentVideo(null);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    checkUserAccess();
    fetchCourse();
  }, [courseId, navigate, token]);

  return (
    <div className="lms-container">
      <div className="nav-bar">
        <div className="video-list">
          {videoList.length > 0 ? (
            videoList.map((video) => (
              <div
                key={video._id}
                className="video-item"
                onClick={() => setCurrentVideo(video)}
              >
                {video.title}
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
      <div className="video-player">
        {currentVideo ? (
          <>
            <iframe
              id="dailymotion-video"
              src={currentVideo.link}
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <div className="video-subtitles">
              <h3>{currentVideo.title}</h3>
              <p>{currentVideo.description}</p>
            </div>
          </>
        ) : (
          <p>Select a video to play</p>
        )}
      </div>
    </div>
  );
};

export default CourseVideoPage;
