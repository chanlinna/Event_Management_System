import React from 'react';
import './TestimonialsSection.css';
import TestimonialCard from '../TestimonialCard/TestimonialCard'; // Path to TestimonialCard

function TestimonialsSection() {
    const testimonials = [
        {
            quote: "EventEase made our wedding day absolutely perfect. Everything was handled with such care and professionalism.",
            author: "- Emily R."
        },
        {
            quote: "Our corporate retreat was a huge success thanks to the meticulous planning by EventEase.",
            author: "- Mark T."
        },
        {
            quote: "From start to finish, EventEase was there to make our launch event a memorable experience.",
            author: "- Sarah L."
        }
    ];

    return (
        <section id="testimonials" className="testimonials-section">
            <h2>What Our Clients Say</h2>
            <div className="testimonial-cards-container">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        quote={testimonial.quote}
                        author={testimonial.author}
                    />
                ))}
            </div>
        </section>
    );
}

export default TestimonialsSection;