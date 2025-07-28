// VenueCard.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './CateringCard.css'; 

const CateringCard = ({ catering }) => {
  if (!catering) {
    return null; 
  }

  return (
    <Link to={`/caterings/${catering.id}`} className="catering-card-link">
      <div className="catering-card">
        {/* Catering Image */}
        <img
          src={`http://localhost:3000${catering.imageUrl}`}
          alt={catering.catering_set}
          className="catering-image"
        />

        <div className="catering-details">
          {/* Catering Name */}
          <h3 className="catering-set">{catering.catering_set}</h3>

          <div className="catering-specs">
            {/* Price */}
            <span className="price">${catering.price} per day</span>
          </div>


          <button className="book-button">Book this Catering</button>
        </div>
      </div>
    </Link>
  );
};

export default CateringCard;