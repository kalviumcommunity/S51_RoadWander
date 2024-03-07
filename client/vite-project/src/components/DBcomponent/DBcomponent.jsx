import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteItem from '../DeleteItem/DeleteItem';
import './DBcomponent.css';

const DBComponent = () => {
  const [destinationData, setDestinationData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedName, setSelectedName] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s51-akhil-roadwander.onrender.com/getdata');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDestinationData(data);
        setFilteredData(data); // Initially set filtered data to all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on selected name
    if (selectedName === 'All') {
      setFilteredData(destinationData); // Display all data
    } else {
      const filtered = destinationData.filter(destination => destination.created_by === selectedName);
      setFilteredData(filtered);
    }
  }, [selectedName, destinationData]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div>
      {destinationData ? (
        <div>
          <h2>Destination Information</h2>
          {/* Dropdown for filtering by names */}
          <select onChange={handleNameChange} value={selectedName}>
            <option value="All">All Names</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
            <option value="David">David</option>
            <option value="Emma">Emma</option>
          </select>
          <Link to="/create" className='link-button'>Add Data +</Link>
          {filteredData.map(destination => (
            <div key={destination._id} className='tableb'>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Destination ID:</strong></td>
                    <td><strong>{destination.destination_id}</strong></td>
                  </tr>
                  <tr>
                    <td>Destination Name</td>
                    <td>{destination.destination_name}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{destination.location}</td>
                  </tr>
                  <tr>
                    <td>Distance from Origin</td>
                    <td>{destination.distance_from_origin}</td>
                  </tr>
                  <tr>
                    <td>Points of Interest</td>
                    <td>{destination.points_of_interest}</td>
                  </tr>
                  <tr>
                    <td>Recommended Activities</td>
                    <td>{destination.recommended_activities}</td>
                  </tr>
                  <tr>
                    <td>Best Time to Visit</td>
                    <td>{destination.best_time_to_visit}</td>
                  </tr>
                  <tr>
                    <td>Ratings or Reviews</td>
                    <td>{destination.ratings_or_reviews}</td>
                  </tr>
                  <tr>
                    <td>Created by</td>
                    <td>{destination.created_by}</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={`/update/${destination.destination_id}`} className='link-button'>Update</Link>
                    </td>
                    <td>
                      <DeleteItem destination_id={destination.destination_id}  />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DBComponent;
