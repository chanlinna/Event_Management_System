// VenueCard.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaMapMarkerAlt } from 'react-icons/fa';
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
          <p className="venue-location">
            <FaMapMarkerAlt className="location-icon" /> {venue.location}
          </p>

          <div className="venue-specs">
            {/* Max Occupancy */}
            <span className="max-occupancy">Max member: {venue.max_occupancy}</span>
            {/* Price */}
            <span className="price">${venue.price} per day</span>
          </div>

          <button className="book-button" style={{background : "#5D8191"}}>Book this Venue</button>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;