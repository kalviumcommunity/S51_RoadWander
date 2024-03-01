import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateItem.css'

const UpdateItem = () => {
  const { destination_id } = useParams();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    destination_name: '',
    location: '',
    distance_from_origin: '',
    points_of_interest: '',
    recommended_activities: '',
    best_time_to_visit: '',
    ratings_or_reviews: ''
  });
  const [apiRes, setApiRes] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://s51-akhil-roadwander.onrender.com/patchdata/${destination_id}`);
        const data = response.data;
        setFormData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response.data.message);
      }
    };
  
    fetchData();
  }, [destination_id]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`https://s51-akhil-roadwander.onrender.com/patchdata/${destination_id}`, formData);
      setApiRes(response.data);
      console.log('Destination updated successfully');
      navigate('/'); // Redirect to the home page after successful update
    } catch (error) {
      console.error('Error updating destination:', error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="edit">
      <h2>Update Destination</h2>
      <form onSubmit={handleSubmit}>
        <p>Destination Name:</p>
        <input
          type="text"
          name="destination_name"
          value={formData.destination_name}
          onChange={handleChange}
        />
        <p>Location:</p>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <p>Distance from Origin:</p>
        <input
          type="text"
          name="distance_from_origin"
          value={formData.distance_from_origin}
          onChange={handleChange}
        />
        <p>Points of Interest:</p>
        <input
          type="text"
          name="points_of_interest"
          value={formData.points_of_interest}
          onChange={handleChange}
        />
        <p>Recommended Activities:</p>
        <input
          type="text"
          name="recommended_activities"
          value={formData.recommended_activities}
          onChange={handleChange}
        />
        <p>Best Time to Visit:</p>
        <input
          type="text"
          name="best_time_to_visit"
          value={formData.best_time_to_visit}
          onChange={handleChange}
        />
        <p>Ratings or Reviews:</p>
        <input
          type="text"
          name="ratings_or_reviews"
          value={formData.ratings_or_reviews}
          onChange={handleChange}
        />
        <button type="submit">Update Destination</button>
      </form>
      {apiRes && <p style={{ color: 'green' }}>{apiRes.message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apiRes && (
        <div>
          <p>Updated Destination:</p>
          <p>Destination Name: {apiRes.destination_name}</p>
          <p>Location: {apiRes.location}</p>
          <p>Distance from Origin: {apiRes.distance_from_origin}</p>
          <p>Points of Interest: {apiRes.points_of_interest}</p>
          <p>Recommended Activities: {apiRes.recommended_activities}</p>
          <p>Best Time to Visit: {apiRes.best_time_to_visit}</p>
          <p>Ratings or Reviews: {apiRes.ratings_or_reviews}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;
