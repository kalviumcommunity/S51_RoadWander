const mongoose = require('mongoose');

// Define the schema for a destination object
const destinationSchema = new mongoose.Schema({
  destination_id: Number,
  destination_name: String,
  location: String,
  distance_from_origin: String,
  points_of_interest: String,
  recommended_activities: String,
  best_time_to_visit: String,
  ratings_or_reviews: String
});

// Create a model from the schema
const yesDestination = mongoose.model('destinations', destinationSchema);

module.exports = yesDestination;
