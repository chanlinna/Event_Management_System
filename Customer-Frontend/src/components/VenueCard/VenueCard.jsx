// VenueCard.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './VenueCard.css'; 

const VenueCard = ({ venue }) => {
  if (!venue) {
    return null; 
  }

  return (
    <Link to={`/venue/${venue.id}`} className="venue-card-link">
      <div className="venue-card">
        {/* Venue Image */}
        <img
          src={`http://localhost:3000${venue.imageUrl}`}
          alt={venue.name}
          className="venue-image"
        />

        <div className="venue-details">
          {/* Venue Name */}
          <h3 className="venue-name">{venue.name}</h3>

          {/* Venue Location */}
          <p className="venue-location">{venue.location}</p>

          <div className="venue-specs">
            {/* Max Occupancy */}
            <span className="max-occupancy">Max Capacity: {venue.max_occupancy} guests</span>
            {/* Price */}
            <span className="price">${venue.price} per day</span>
          </div>

          <button className="book-button">Book this Venue</button>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;