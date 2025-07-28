// VenueCard.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!venue) return null;

  const handleBookVenue = () => {
    navigate('/booking', {
      state: { 
        selectedVenue: venue,
        formData: location.state?.formData
       },
    });
  };

  return (
    <div className="venue-card">
      <img
        src={`http://localhost:3000${venue.imageUrl}`}
        alt={venue.name}
        className="venue-image"
      />

      <div className="venue-details">
        <h3 className="venue-name">{venue.name}</h3>
        <p className="venue-location">
          <FaMapMarkerAlt className="location-icon" /> {venue.location}
        </p>

        <div className="venue-specs">
          <span className="max-occupancy">Max member: {venue.max_occupancy}</span>
          <span className="price">${venue.price} per day</span>
        </div>

        <button onClick={handleBookVenue} className="book-button" style={{ background: "#5D8191" }}>
          Book this Venue
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
