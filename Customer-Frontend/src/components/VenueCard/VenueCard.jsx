// Customer-Frontend/src/components/VenueCard/VenueCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <div className="venue-image-container">
        <img 
          src={venue.imageUrl? `http://localhost:3000${venue.imageUrl}` : '/placeholder-venue.jpg' } 
          alt={venue.name} 
          className="venue-image"
        />
      </div>
      <div className="venue-content">
        <h3 className="venue-name">{venue.name}</h3>
        <p className="venue-location">
          <i className="fas fa-map-marker-alt"></i> {venue.location}
        </p>
        <div className="venue-meta">
          <span className="capacity">
            <i className="fas fa-users"></i> {venue.max_occupancy} max
          </span>
          <span className="price">
            <i className="fas fa-tag"></i> ${venue.price}
          </span>
        </div>
        <Link to={`/venues/${venue.venueId}`} className="view-details-btn">
          View Details <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;