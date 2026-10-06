import { Link } from 'react-router-dom';
import '../PagesDesign.css';
import { useState, useEffect } from 'react';

function DisplayPage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(stored);
  }, []);

  return (
    <div>
      <h1>Feedback Display Page</h1>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">← Back to Submit Feedback</Link>
      </p>

      {feedbackList.length === 0 ? (
        <p className="no-feedback">No feedback submitted yet.</p>
      ) : (
        feedbackList.map((entry, index) => (
          <div key={index} className="feedback-card">
            <p><strong>Name:</strong> {entry.firstName} {entry.lastName}</p>
            <p><strong>Phone:</strong> {entry.phone}</p>
            <p><strong>Email:</strong> {entry.email}</p>
            <p><strong>Event:</strong> {entry.eventName}</p>
            <p><strong>Event Date:</strong> {entry.eventDate}</p>
            <p><strong>Rating:</strong> {entry.rating} / 5</p>
            <p><strong>Message:</strong> {entry.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DisplayPage;