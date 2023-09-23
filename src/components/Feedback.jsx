import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    suggestionType: 'bug',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    navigate("/")
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="feedback-container">
      <header>Feedback Form</header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="suggestionType">Suggestion Type:</label>
          <select
            id="suggestionType"
            name="suggestionType"
            value={formData.suggestionType}
            onChange={handleChange}
          >
            <option value="bug">Bug</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
