import React, { useState, useEffect } from 'react';
import { getCaterings } from '../../api/cateringService';
import CateringCard from '../CateringCard/CateringCard';
import Pagination from '../Pagination/Pagination';
import './CateringsList.css';

const CateringsList = ({ isHomepage = false, formData = null }) => {
  const [caterings, setCaterings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: isHomepage ? 3 : 12,
    totalItems: 0,
    totalPages: 1
  });
  const [sortBy, setSortBy] = useState('price');

  const fetchCaterings = async () => {
    try {
      setLoading(true);
      const data = await getCaterings(pagination.page, pagination.limit, sortBy);
      setCaterings(data.data);
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
    fetchCaterings();
  }, [pagination.page, sortBy]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  if (loading) return <div className="loading">Loading caterings...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="caterings-list-container">
      {!isHomepage && (
        <div className="caterings-header">
          <h2>Our Caterings</h2>
          <div className="sort-options">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="catering-set">Catering Set (A-Z)</option>
              <option value="catering-set-Desc">Cateringset (Z-A)</option>
              <option value="price">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      )}

      <div className="caterings-grid">
        {caterings.length > 0 ? (
          caterings.map(catering => (
            <CateringCard 
              key={catering.cateringId} 
              catering={catering} 
              formData={formData}  // Pass formData to each CateringCard
            />
          ))
        ) : (
          <div className="no-results">
            No caterings found
          </div>
        )}
      </div>

      {!isHomepage && caterings.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CateringsList;