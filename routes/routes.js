const express = require('express');
const router = express.Router();
const Destination = require('../Modal/modal.js');

// GET all destinations
router.get('/getdata', async (req, res) => {
  try {
    const getdestinations = await Destination.find();
    res.status(200).json(getdestinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new destination
router.post('/postdata', async(req, res) => {
  try {
      const { destination_id, destination_name, location, distance_from_origin, points_of_interest, recommended_activities, best_time_to_visit, ratings_or_reviews } = req.body;
      console.log(req.body);
      const newDestination = new Destination({
          destination_id,
          destination_name,
          location,
          distance_from_origin,
          points_of_interest,
          recommended_activities,
          best_time_to_visit,
          ratings_or_reviews
      });
      await newDestination.save();
      res.status(200).json({ "successfully posted": newDestination });
  } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
  }
});

// PATCH (update) a destination
router.patch('/patchdata/:destination_id', async (req, res) => {
  const { destination_id } = req.params;
  const updates = req.body;

  try {
    console.log("Updating destination with ID:", destination_id);
    console.log("Updates:", updates);

    const updatedDestination = await Destination.findOneAndUpdate(
      { destination_id: destination_id }, 
      { $set: updates },
      { new: true }
    );

    console.log("Updated destination:", updatedDestination);

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Successfully updated', updatedDestination });
  } catch (err) {
    console.error("Error updating destination:", err);
    res.status(400).json({ message: err.message });
  }
});


// DELETE a destination
router.delete('/deletedata/:destination_id', async (req, res) => {
  const { destination_id } = req.params;

  try {
    console.log("Deleting destination with ID:", destination_id);

    const deletedDestination = await Destination.findOneAndDelete(
      { destination_id: destination_id }
    );
    
    console.log("Deleted destination:", deletedDestination);

    if (!deletedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Successfully deleted', deletedDestination });
  } catch (err) {
    console.error("Error deleting destination:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;