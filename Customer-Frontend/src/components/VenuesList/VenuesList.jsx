import React, { useState, useEffect } from 'react';
import { getVenues } from '../../api/venueService';
import VenueCard from '../VenueCard/VenueCard';
import Pagination from '../Pagination/Pagination';
import './VenuesList.css';

const VenuesList = ({ isHomepage = false }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: isHomepage ? 3 : 6,
    totalItems: 0,
    totalPages: 1
  });
  const [sortBy, setSortBy] = useState('max_occupancy');

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const data = await getVenues(pagination.page, pagination.limit, sortBy);
      setVenues(data.data);
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
    fetchVenues();
  }, [pagination.page, sortBy]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  if (loading) return <div className="loading">Loading venues...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="venues-list-container">
      {!isHomepage && (
        <div className="venues-header">
          <h2>Our Venues</h2>
          <div className="sort-options">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="max_occupancy">Capacity (Low to High)</option>
              <option value="max_occupancyDesc">Capacity (High to Low)</option>
              <option value="name">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="price">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      )}

      <div className="venues-grid">
        {venues.map(venue => (
          <VenueCard key={venue.venueId} venue={venue} />
        ))}
      </div>

      {!isHomepage && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default VenuesList;