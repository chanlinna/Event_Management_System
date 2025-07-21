import React from 'react';
import './VenueCard.css';

function VenueCard({ image, title, description }) {
    return (
        <div className="venue-card">
            <img src={image} alt={title} className="venue-card-image" />
            <h3 className="venue-card-title">{title}</h3>
            <p className="venue-card-description">{description}</p>
        </div>
    );
}

export default VenueCard;