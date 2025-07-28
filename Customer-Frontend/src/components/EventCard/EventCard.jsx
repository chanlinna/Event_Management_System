// Customer-Frontend/src/components/EventCard/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css'; // Import the CSS file

const EventCard = ({ event }) => {
  if (!event) {
    return null; // Or render a loading/placeholder state
  }

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedStartDate = formatDate(event.startDate);
  const formattedEndDate = event.end_date ? formatDate(event.end_date) : '';

  // Construct image URL from backend base URL
  const fullImageUrl = event.imageUrl ? `http://localhost:3000${event.imageUrl}` : '';

  return (
    <div className="event-card-container">
      {/* Image Placeholder or Actual Image */}
      <div className="event-image-placeholder">
        {fullImageUrl ? (
          <img src={fullImageUrl} alt={event.name} className="event-actual-image" />
        ) : (
          <div className="placeholder-content">
            {/* SVG placeholder for image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="placeholder-icon"
            >
              <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v9h14V7H5zm2 2a1 1 0 00-1 1v4a1 1 0 001 1h8a1 1 0 001-1v-4a1 1 0 00-1-1H7zm1 1h6v3H8v-3zm7 0a1 1 0 100 2 1 1 0 000-2zm-3-4a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <p>No Image</p>
          </div>
        )}
      </div>

      <div className="event-details-content">
        {/* Event Name */}
        <h3 className="event-name">{event.name}</h3>

        {/* Start and End Date */}
        <p className="event-dates">
          {formattedStartDate}
          {formattedEndDate && ` - ${formattedEndDate}`}
        </p>

        {/* Event Type */}
        <p className="event-type">
          {event.EventType ? event.EventType.name : 'N/A'} {/* Assuming EventType is populated */}
        </p>

        {/* Short Description */}
        <p className="event-description">
          {event.desc || 'No description available.'}
        </p>

        {/* See More Button */}
        {/* Adjust the 'to' prop based on your event detail page route */}
        <Link to={`/events/${event.eventId}`} className="see-more-btn">
          See More
        </Link>
      </div>
    </div>
  );
};

export default EventCard;