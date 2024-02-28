import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UserInput.css';

const UserInput = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    destination_id: '',
    destination_name: '',
    location: '',
    distance_from_origin: '',
    points_of_interest: '',
    recommended_activities: '',
    best_time_to_visit: '',
    ratings_or_reviews: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://s51-akhil-roadwander.onrender.com/postdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      // Reset
      setFormData({
        destination_id: '',
        destination_name: '',
        location: '',
        distance_from_origin: '',
        points_of_interest: '',
        recommended_activities: '',
        best_time_to_visit: '',
        ratings_or_reviews: ''
      });

      onAdd();

      navigate('/');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  
  return (
    <div className="user-input-container">
      <h2>Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="destination_id">Destination ID:</label>
        <input type="text" id="destination_id" name="destination_id" value={formData.destination_id} onChange={handleChange} />

        <label htmlFor="destination_name">Destination Name:</label>
        <input type="text" id="destination_name" name="destination_name" value={formData.destination_name} onChange={handleChange} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />

        <label htmlFor="distance_from_origin">Distance from Origin:</label>
        <input type="text" id="distance_from_origin" name="distance_from_origin" value={formData.distance_from_origin} onChange={handleChange} />

        <label htmlFor="points_of_interest">Points of Interest:</label>
        <input type="text" id="points_of_interest" name="points_of_interest" value={formData.points_of_interest} onChange={handleChange} />

        <label htmlFor="recommended_activities">Recommended Activities:</label>
        <input type="text" id="recommended_activities" name="recommended_activities" value={formData.recommended_activities} onChange={handleChange} />

        <label htmlFor="best_time_to_visit">Best Time to Visit:</label>
        <input type="text" id="best_time_to_visit" name="best_time_to_visit" value={formData.best_time_to_visit} onChange={handleChange} />

        <label htmlFor="ratings_or_reviews">Ratings or Reviews:</label>
        <input type="text" id="ratings_or_reviews" name="ratings_or_reviews" value={formData.ratings_or_reviews} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInput;
