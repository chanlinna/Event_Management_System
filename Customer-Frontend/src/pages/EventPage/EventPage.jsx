import React from 'react';
import NavBar from '../../components/NavBar/NavBar'; 
import EventsList from '../../components/EventsList/EventsList'; 
import Footer from '../../components/Footer/Footer';
import './EventPage.css';

const EventPage = () => {
  return (
    <div className="event-page-container">
      <NavBar /> 
      
      <main className="event-page-main-content">
        <EventsList isHomepage={false} /> 
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;