import React from 'react';
import './TestimonialCard.css';

function TestimonialCard({ quote, author }) {
    return (
        <div className="testimonial-card">
            <p className="testimonial-quote">"{quote}"</p>
            <p className="testimonial-author">{author}</p>
        </div>
    );
}

export default TestimonialCard;