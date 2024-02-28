import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DBcomponent.css';

const DBComponent = () => {
  const [destinationData, setDestinationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://s51-akhil-roadwander.onrender.com/getdata');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDestinationData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {destinationData ? (
        <div>
          <h2>Destination Information</h2>
          <Link to="/create" className='link-button'>Add Data +</Link>
          {destinationData.map(destination => (
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
