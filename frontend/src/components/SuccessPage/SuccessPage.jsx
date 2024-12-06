import React, { useEffect } from 'react';
import './SuccessPage.css'; // Include the CSS file for styling

const SuccessPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <div className="success-container">
      <div className="success-message">
        <h1>Thank You for Your Inquiry!</h1>
        <p>We have received your inquiry and our team will get back to you shortly.</p>
        <p>Your request is important to us, and we're excited to assist you with your needs at Tripjar!</p>
        <div className="animation">
          <span>🎉</span>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
