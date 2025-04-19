import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const Feedback = () => {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: name.name,
    email: name.email,
    message: '',
    rating: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        timestamp: new Date()
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-content">
          <h2 className="feedback-title">
            Share Your Feedback
          </h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Rating
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="form-select"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Star' : 'Stars'}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="form-textarea"
                placeholder="Share your thoughts..."
              />
            </div>
            <button
              type="submit"
              className="form-button"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
