import React, { useState, useEffect } from 'react';
import { getEvents } from '../../api/eventService'; 
import EventCard from '../EventCard/EventCard';  
import Pagination from '../Pagination/Pagination'; 
import './EventsList.css'; 

const EventsList = ({ isHomepage = false }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: isHomepage ? 3 : 3, 
    totalItems: 0,
    totalPages: 1
  });
  const [sortBy, setSortBy] = useState('startDate');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents(pagination.page, pagination.limit, sortBy);
      setEvents(data.data);
      setPagination({
        ...pagination,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [pagination.page, sortBy]); 

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); 
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="events-list-container"> 
      {!isHomepage && ( 
        <div className="events-header"> 
          <h2>Our Events</h2>
          <div className="sort-options">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="startDate">Date (Soonest)</option>
              <option value="startDateDesc">Date (Latest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="budget">Budget (Low to High)</option>
              <option value="budgetDesc">Budget (High to Low)</option>
            </select>
          </div>
        </div>
      )}

      <div className="events-grid"> 
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.eventId} event={event} />
          ))
        ) : (
          <p className="no-events-found">No events found.</p>
        )}
      </div>

      {!isHomepage && pagination.totalPages > 1 && ( 
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {isHomepage && events.length > 0 && (
         <div className="see-more-container">
           <Link to="/events" className="see-more-btn">
             See All Events <i className="fas fa-arrow-right"></i> 
           </Link>
         </div>
      )}
    </div>
  );
};

export default EventsList;