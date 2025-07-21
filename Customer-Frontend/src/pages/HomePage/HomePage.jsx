import React from 'react';
import styles from './HomePage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import HeroSection from '../../components/HeroSection/HeroSection';
import VenuesSection from '../../components/VenuesSection/VenuesSection';
import CateringSection from '../../components/CateringSection/CateringSection'; // NEW IMPORT
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import Footer from '../../components/Footer/Footer';


function HomePage() {
    return (
        <div className={styles['home-page']}>
            <NavBar />
            <HeroSection />

            {/* Our Services Section - Integrated directly (remains as is) */}
            <section id="our-services" className={styles['our-services-section']}>
                <h2>Our Services</h2>
                <p>
                    EventEase offers a seamless experience in planning and managing events, from venues to catering, ensuring every detail is perfect.
                </p>
            </section>

            <VenuesSection />

            {/* Catering Section - Now a separate component */}
            <CateringSection /> {/* RENDER THE NEW COMPONENT */}

            <TestimonialsSection />
            <Footer />
        </div>
    );
}

export default HomePage;