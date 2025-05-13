import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../components/config';
import '../styles/profile.css';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('Auth token not found');
        return;
      }

      try {
        const response = await fetch(`${config.API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Name:</strong> <span>{user.name}</span>
        </div>
        <div className="profile-item">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="profile-item">
          <strong>Phone Number:</strong> <span>{user.phoneNumber}</span>
        </div>
        <div className="profile-item">
          <strong>Role:</strong> <span>{user.role}</span>
        </div>
        <div className="profile-item">
          <strong>Total Spent:</strong> <span>${user.totalSpent}</span>
        </div>
        {user.photo && (
          <div className="profile-item">
            <strong>Photo:</strong>
            <img src={user.photo} alt={`${user.name}'s Profile`} className="profile-photo" />
          </div>
        )}
        <div className="profile-item">
          <strong>Purchased Courses:</strong>
          <ul>
            {user.purchasedCourses.length > 0 ? (
              user.purchasedCourses.map((courseId) => (
                <li key={courseId}>
                  <Link to={`/courses/${courseId}`}>Course {courseId}</Link>
                </li>
              ))
            ) : (
              <p>No courses purchased.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
