// Customer-Frontend/src/pages/EventPage/EventPage.jsx
import React from 'react';
import NavBar from '../../components/NavBar/NavBar'; 
import EventsList from '../../components/EventsList/EventsList'; 
import './EventPage.css';

const EventPage = () => {
  return (
    <div className="event-page-container">
      <NavBar /> 
      
      <main className="event-page-main-content">
        {/* The EventsList component will display all events with pagination and sorting */}
        <EventsList isHomepage={false} /> 
      </main>

    </div>
  );
};

export default EventPage;