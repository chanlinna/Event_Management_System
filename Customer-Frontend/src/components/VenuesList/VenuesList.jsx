import React, { useState, useEffect } from 'react';
import { getVenues, searchVenues } from '../../api/venueService';
import VenueCard from '../VenueCard/VenueCard';
import Pagination from '../Pagination/Pagination';
import './VenuesList.css';

const VenuesList = ({ isHomepage = false, searchFilters = null }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: isHomepage ? 3 : 12,
    totalItems: 0,
    totalPages: 1
  });
  const [sortBy, setSortBy] = useState('max_occupancy');

  const fetchVenues = async () => {
    try {
      setLoading(true);
      let data;
      
      if (searchFilters) {
        data = await searchVenues({
          ...searchFilters,
          page: pagination.page,
          limit: pagination.limit,
          sortby: sortBy
        });
      } else {
        data = await getVenues(pagination.page, pagination.limit, sortBy);
      }

      setVenues(data.data);
      setPagination({
        ...pagination,
        totalItems: data.meta.totalItems,
        totalPages: Math.ceil(data.meta.totalItems / pagination.limit)
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [pagination.page, sortBy, searchFilters]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  if (loading) return <div className="loading">Loading venues...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="venues-list-container">
      {!isHomepage && (
        <div className="venues-header">
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
        {venues.length > 0 ? (
          venues.map(venue => (
            <VenueCard key={venue.id || venue.venueId} venue={venue} />
          ))
        ) : (
          <div className="no-results">
            No venues found matching your search criteria
          </div>
        )}
      </div>

      {!isHomepage && venues.length > 0 && (
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