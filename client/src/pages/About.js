import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>About Us</h2>
        <p>Welcome to our Learning Management System!</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide high-quality education and resources to help you excel in your career and personal development. We believe in the power of learning and strive to make education accessible to everyone.
          </p>
        </section>
        <section className="about-section">
          <h3>Our Vision</h3>
          <p>
            We envision a world where everyone has the opportunity to learn and grow. Our platform is designed to offer a wide range of courses and resources to meet the diverse needs of our learners.
          </p>
        </section>
        <section className="about-section">
          <h3>Our Team</h3>
          <p>
            Our team is composed of experienced educators, industry professionals, and technology experts who are passionate about education. We work together to create engaging and effective learning experiences for our users.
          </p>
        </section>
        <section className="about-section">
          <h3>Contact Us</h3>
          <p>
            If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@lms.com">support@lms.com</a>. We are here to help you succeed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
