import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Reach out to us via the following:</p>
      </div>
      <div className="contact-content">
        <section className="contact-section">
          <h3>Email Us</h3>
          <p>
            For general inquiries, please email us at <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </section>
        <section className="contact-section">
          <h3>Call Us</h3>
          <p>
            You can reach us by phone at <strong>+1 123-456-7890</strong>. Our support team is available from 9 AM to 5 PM, Monday to Friday.
          </p>
        </section>
        <section className="contact-section">
          <h3>Visit Us</h3>
          <p>
            Our office is located at:
          </p>
          <address>
            123 Learning St.<br />
            Education City, EC 12345<br />
            Country
          </address>
        </section>
        <section className="contact-section">
          <h3>Follow Us</h3>
          <p>
            Stay connected with us on social media:
          </p>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Contact;
