import React from 'react';
import './CateringSection.css';
import CateringCard from '../CateringCard/CateringCard'; // Path to CateringCard

// Placeholder images for catering options
import fineDiningImage from '../../assets/catering-fine-dining.jpg'; // Make sure you have these images in src/assets
import buffetStyleImage from '../../assets/catering-buffet-style.jpg';
import cocktailPartyImage from '../../assets/catering-cocktail-party.jpg';

function CateringSection() {
    const cateringOptions = [
        {
            image: fineDiningImage,
            title: 'Gourmet Fine Dining',
            description: 'Exquisite multi-course meals crafted by top chefs for an elegant experience.'
        },
        {
            image: buffetStyleImage,
            title: 'Extensive Buffet Style',
            description: 'A wide array of delicious dishes served buffet-style, perfect for larger gatherings.'
        },
        {
            image: cocktailPartyImage,
            title: 'Chic Cocktail Receptions',
            description: 'Stylish appetizers, nutrition meal.'
        }
    ];

    return (
        <section id="catering" className="catering-section">
            <h2>Catering</h2>
            <div className="catering-cards-container">
                {cateringOptions.map((option, index) => (
                    <CateringCard
                        key={index}
                        image={option.image}
                        title={option.title}
                        description={option.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default CateringSection;