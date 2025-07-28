// Customer-Frontend/src/components/EventsList/EventsList.jsx
import React, { useState, useEffect } from 'react';
import { getEvents } from '../../api/eventService'; // Import eventService
import EventCard from '../EventCard/EventCard';   // Import EventCard
import Pagination from '../Pagination/Pagination'; // Assuming you have a Pagination component
import './EventsList.css'; // Import the dedicated CSS for this list

const EventsList = ({ isHomepage = false }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: isHomepage ? 3 : 12, // Limit to 3 for homepage, 12 for full list
    totalItems: 0,
    totalPages: 1
  });
  const [sortBy, setSortBy] = useState('startDate'); // Default sort by start date (soonest)

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Call getEvents from your eventService.js
      const data = await getEvents(pagination.page, pagination.limit, sortBy);
      setEvents(data.data); // Assuming data.data holds the array of events
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
  }, [pagination.page, sortBy]); // Re-fetch when page or sort order changes

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when sort changes
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="events-list-container"> {/* Main container for event list */}
      {!isHomepage && ( // Show header and sort options only if not on homepage
        <div className="events-header"> {/* Header section */}
          <h2>Our Events</h2>
          <div className="sort-options"> {/* Sort dropdown container */}
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
            >
              {/* These values should match the `sortBy` options your backend controller handles */}
              <option value="startDate">Date (Soonest)</option>
              <option value="startDateDesc">Date (Latest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="budget">Budget (Low to High)</option>
              <option value="budgetDesc">Budget (High to Low)</option>
              {/* Add more options as per your backend's sorting capabilities */}
            </select>
          </div>
        </div>
      )}

      <div className="events-grid"> {/* Grid for displaying event cards */}
        {events.length > 0 ? (
          events.map(event => (
            // eventId is the primary key from your Event model
            <EventCard key={event.eventId} event={event} />
          ))
        ) : (
          <p className="no-events-found">No events found.</p>
        )}
      </div>

      {!isHomepage && pagination.totalPages > 1 && ( // Show pagination only if not homepage and multiple pages exist
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {/* If you have a 'See More' button for homepage, it would go here */}
      {isHomepage && events.length > 0 && (
         <div className="see-more-container">
           <Link to="/events" className="see-more-btn">
             See All Events <i className="fas fa-arrow-right"></i> {/* Font Awesome icon example */}
           </Link>
         </div>
      )}
    </div>
  );
};

export default EventsList;