// DeleteButton.jsx
import React from 'react';
import DeleteItem from '../DeleteItem/DeleteItem'; // Import the DeleteItem component

const DeleteButton = ({ itemId, onDelete }) => {
  return (
    <DeleteItem destinationId={itemId} onDelete={onDelete} />
  );
};

export default DeleteButton;
