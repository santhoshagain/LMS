import React from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import config from "../components/config";
// import Modal from "react-modal";
import "../styles/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="options">
        <div className="option" onClick={() => navigateTo("/course-crud")}>
          <h2>Courses</h2>
        </div>
        <div className="option" onClick={() => navigateTo("/user-crud")}>
          <h2>Users</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
