import React from 'react';
import './DetailedDescriptionComponent.css'

const DetailedDescriptionComponent = ({ description }) => {
  return (
    <div className="detailed-description">
      <h2>{description.title}</h2>
      <h3>Destination ID: {description.id}</h3>
      <p>{description.content}</p>
      <p>Author: {description.author}</p>
      <p>Date: {description.date}</p>
    </div>  
  );
}

// Dummy data for rendering the component
const dummyDescription = {
  id: 2,
  title: "Yellowstone National Park",
  content: "Yellowstone National Park, located in Wyoming, USA, is a mesmerizing destination renowned for its natural beauty and diverse wildlife. Situated approximately 300 miles away from the origin point, Yellowstone offers a plethora of attractions to visitors. Among its notable points of interest are the iconic Old Faithful geyser, known for its predictable eruptions, and the majestic Yellowstone Lake, offering breathtaking views and opportunities for recreational activities. Visitors to Yellowstone can engage in various recommended activities, including wildlife viewing to observe the park's abundant fauna and exploring its fascinating geothermal features, such as hot springs and geysers. Summer is considered the best time to visit Yellowstone, as the weather is generally mild, and many of the park's attractions are easily accessible during this season. With an average rating of 4.7 out of 5, Yellowstone National Park continues to captivate travelers with its stunning landscapes, diverse ecosystems, and unparalleled natural wonders.",
  author: "John Doe",
  date: "February 26, 2024"
};

// Render the component with dummy data
const App = () => {
  return (
    <div className="App">
      <h1>Detailed Description Component</h1>
      <DetailedDescriptionComponent description={dummyDescription} />
    </div>
  );
}

export default App;
