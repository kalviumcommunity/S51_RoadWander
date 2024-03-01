import React from 'react';
import axios from 'axios';

const DeleteItem = ({ destination_id }) => {
  const deleteDestination = async () => {
    try {
      const response = await axios.delete(`https://s51-akhil-roadwander.onrender.com/deletedata/${destination_id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <button onClick={deleteDestination}>
      Delete Destination
    </button>
  );
};

export default DeleteItem;
