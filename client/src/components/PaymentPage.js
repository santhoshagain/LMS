import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import config from '../components/config';
import '../styles/payment.css';

const PaymentPage = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const [course, setCourse] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${config.API_URL}/courses/${courseId}`);
        if (!response.ok) throw new Error('Course not found');
        const data = await response.json();
        setCourse(data);
        setPaymentAmount(data.courseCost); // Set the payment amount to course cost
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePayment = async () => {
    setIsProcessing(true);
    const token = Cookies.get('authToken'); // Get the token from cookies

    if (!token) {
      console.error('User not authenticated');
      setIsProcessing(false);
      navigate('/login'); // Redirect to login page
      return;
    }

    try {
      const response = await fetch(`${config.API_URL}/courses/purchase/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentAmount }),
      });

      if (!response.ok) throw new Error('Payment failed');
      const data = await response.json();
      alert('Payment successful! Course purchased.');

      // Redirect to the profile or course page after successful payment
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
    setIsProcessing(false);
  };

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="payment-container">
      <h2>Complete Payment for {course.courseName}</h2>
      <div className="payment-details">
        <div className="payment-item">
          <strong>Course Name:</strong> <span>{course.courseName}</span>
        </div>
        <div className="payment-item">
          <strong>Course Price:</strong> <span>${course.courseCost}</span>
        </div>
        <div className="payment-item">
          <strong>Total Amount:</strong> <span>${paymentAmount}</span>
        </div>
      </div>

      <div className="payment-actions">
        <button
          className="btn-primary"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing Payment...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
