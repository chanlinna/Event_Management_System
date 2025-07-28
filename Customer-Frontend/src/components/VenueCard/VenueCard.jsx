// VenueCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './VenueCard.css'; // We'll create this CSS file next

const VenueCard = ({ venue }) => {
  // Ensure venue object and its properties exist before rendering
  if (!venue) {
    return null; // Or a loading/error state
  }

  return (
    // The entire card can be a link to the venue's detail page
    // Assuming you have a route like '/venue/:id'
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

          {/* Book this Venue Button */}
          {/* You might want this button to navigate to a specific booking form
              or trigger a modal, but for simplicity, we'll keep it within the Link for now.
              If it needs separate behavior, it should be outside the parent Link or have
              an onClick that stops propagation. */}
          <button className="book-button">Book this Venue</button>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;