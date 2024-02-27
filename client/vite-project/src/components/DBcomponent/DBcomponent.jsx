import React, { useState, useEffect } from 'react';
import './DBcomponent.css'

const DBComponent = () => {
  const [destinationData, setDestinationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getdata');
        
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
          <table>
            <tbody>
              {destinationData.map(destination => (
                <React.Fragment key={destination._id}>
                  <tr>
                    <td>Destination ID</td>
                    <td>{destination.destination_id}</td>
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DBComponent;
