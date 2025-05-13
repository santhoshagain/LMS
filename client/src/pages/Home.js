import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Code } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Your Learning Potential with Our Courses
          </h1>
          <p className="hero-description">
            Access high-quality courses designed to help you succeed in your career.
          </p>
          <Link to="/courses" className="cta-button">
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Popular Course Categories</h2>
        <div className="categories-container">
          <div className="category-card">
            <BookOpen className="category-icon" />
            <h3 className="category-title">Web Development</h3>
            <p className="category-description">
              Master HTML, CSS, JavaScript, and frameworks like React & Angular.
            </p>
            <Link to="/courses" className="browse-link">Browse Courses</Link>
          </div>

          <div className="category-card">
            <Award className="category-icon" />
            <h3 className="category-title">Data Science</h3>
            <p className="category-description">
              Learn data analysis, machine learning, and AI technologies.
            </p>
            <Link to="/courses" className="browse-link">Browse Courses</Link>
          </div>

          <div className="category-card">
            <Users className="category-icon" />
            <h3 className="category-title">Business & Marketing</h3>
            <p className="category-description">
              Grow your business with marketing, finance, and management courses.
            </p>
            <Link to="/courses" className="browse-link">Browse Courses</Link>
          </div>

          <div className="category-card">
            <Code className="category-icon" />
            <h3 className="category-title">Programming</h3>
            <p className="category-description">
              Learn programming languages like Python, Java, and C++.
            </p>
            <Link to="/courses" className="browse-link">Browse Courses</Link>
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="instructors-section">
        <h2 className="section-title">Meet Our Expert Instructors</h2>
        <div className="instructors-container">
          <div className="instructor-card">
            <img src="https://randomuser.me/api/portraits/men/10.jpg" alt="Instructor" className="instructor-image" />
            <h3 className="instructor-name">John Doe</h3>
            <p className="instructor-title">Full Stack Web Developer</p>
            <p className="instructor-bio">John has 10+ years of experience in web development and has trained over 500 students.</p>
          </div>

          <div className="instructor-card">
            <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Instructor" className="instructor-image" />
            <h3 className="instructor-name">Jane Smith</h3>
            <p className="instructor-title">Data Scientist & Machine Learning Expert</p>
            <p className="instructor-bio">Jane has led several data-driven projects for Fortune 500 companies and teaches AI in practical ways.</p>
          </div>

          <div className="instructor-card">
            <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="Instructor" className="instructor-image" />
            <h3 className="instructor-name">Robert Lee</h3>
            <p className="instructor-title">Marketing & Growth Expert</p>
            <p className="instructor-bio">With a passion for digital marketing, Robert helps businesses grow through effective strategies.</p>
          </div>

          <div className="instructor-card">
            <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Instructor" className="instructor-image" />
            <h3 className="instructor-name">Lisa Brown</h3>
            <p className="instructor-title">Software Engineer</p>
            <p className="instructor-bio">Lisa has a background in software engineering and has worked on numerous high-profile projects.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Students Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p className="testimonial-text">"The web development course was amazing! It helped me land my first job as a front-end developer."</p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="Student" className="testimonial-author-image" />
              <div>
                <h3 className="testimonial-author-name">Alex Johnson</h3>
                <p className="testimonial-author-title">Web Developer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"The data science program taught me everything I needed to know to transition into a tech career."</p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/8.jpg" alt="Student" className="testimonial-author-image" />
              <div>
                <h3 className="testimonial-author-name">Emily Davis</h3>
                <p className="testimonial-author-title">Data Scientist</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"The marketing course gave me all the tools I needed to scale my business online. Highly recommend!"</p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/18.jpg" alt="Student" className="testimonial-author-image" />
              <div>
                <h3 className="testimonial-author-name">James Lee</h3>
                <p className="testimonial-author-title">Entrepreneur</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">"The programming course was very comprehensive and helped me improve my coding skills significantly."</p>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Student" className="testimonial-author-image" />
              <div>
                <h3 className="testimonial-author-name">Sophia Martinez</h3>
                <p className="testimonial-author-title">Software Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
