import React from 'react';
import './VenuesSection.css';
import VenueCard from '../VenueCard/VenueCard'; // Path to VenueCard

// Import your venue images from assets
import grandBallroomImage from '../../assets/grand-ballroom.jpg';
import rooftopTerraceImage from '../../assets/rooftop-terraces.jpg';
import rusticBarnImage from '../../assets/rustic-barn.jpg';

function VenuesSection() {
    const venues = [
        {
            image: grandBallroomImage,
            title: 'Grand Ballroom',
            description: 'An exquisite venue for weddings and large gatherings.'
        },
        {
            image: rooftopTerraceImage,
            title: 'Rooftop Terrace',
            description: 'A modern space with breathtaking views of the city skyline.'
        },
        {
            image: rusticBarnImage,
            title: 'Rustic Barn',
            description: 'Perfect for a charming, countryside celebration.'
        }
    ];

    return (
        <section id="venues" className="venues-section">
            <h2>Venues</h2>
            <div className="venue-cards-container">
                {venues.map((venue, index) => (
                    <VenueCard
                        key={index}
                        image={venue.image}
                        title={venue.title}
                        description={venue.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default VenuesSection;