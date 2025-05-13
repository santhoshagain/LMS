import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "./config";
import Modal from "react-modal";

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const token = Cookies.get("authToken");
  const userId = Cookies.get("userId");

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "User-Id": userId // Include userId in the header
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, userId]);

  // Select a User to View Details
  const viewUserDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API_URL}/users/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "User-Id": userId // Include userId in the header
        },
      });
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle Edit User
  const handleEdit = (user) => {
    setEditMode(true);
    setEditData(user);
    setModalIsOpen(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(`${config.API_URL}/users/${editData._id}`, editData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "User-Id": userId // Include userId in the header
        },
      });
      alert("User updated successfully.");
      setEditMode(false);
      setModalIsOpen(false);
      fetchUsers(); // Refresh the user list
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${config.API_URL}/users/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "User-Id": userId // Include userId in the header
        },
      });
      alert("User deleted successfully.");
      setUsers(users.filter((user) => user._id !== id));
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-crud">
      <h1>Welcome to User CRUD Operations</h1>
      {/* User List */}
      <div className="user-list">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => viewUserDetails(user._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Details */}
      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
          <p><strong>Purchased Courses:</strong> {selectedUser.purchasedCourses.join(", ") || "None"}</p>
          <button onClick={() => handleEdit(selectedUser)}>Edit</button>
          <button onClick={() => deleteUser(selectedUser._id)}>Delete</button>
        </div>
      )}
      {/* Edit User Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Edit User</h2>
        <label>Name: </label>
        <input
          name="name"
          value={editData.name || ""}
          onChange={handleEditChange}
        />
        <label>Email: </label>
        <input
          name="email"
          value={editData.email || ""}
          onChange={handleEditChange}
        />
        <label>Phone: </label>
        <input
          name="phoneNumber"
          value={editData.phoneNumber || ""}
          onChange={handleEditChange}
        />
        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default UserCRUD;
