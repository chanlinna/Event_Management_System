import React from 'react';
import './CateringCard.css';

function CateringCard({ image, title, description }) {
    return (
        <div className="catering-card">
            <img src={image} alt={title} className="catering-card-image" />
            <h3 className="catering-card-title">{title}</h3>
            <p className="catering-card-description">{description}</p>
        </div>
    );
}

export default CateringCard;