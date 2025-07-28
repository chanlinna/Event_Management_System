import React, { useState, useEffect } from 'react';
import './SearchFilters.css';

const LOCATIONS = [
  'Banteay Meanchey',
  'Battambang',
  'Kampong Cham',
  'Kampong Chhnang',
  'Kampong Speu',
  'Kampong Thom',
  'Kampot',
  'Kandal',
  'Kep',
  'Koh Kong',
  'Kratie',
  'Mondulkiri',
  'Oddar Meanchey',
  'Pailin',
  'Preah Vihear',
  'Preah Sihanouk',
  'Prey Veng',
  'Pursat',
  'Ratanakiri',
  'Siem Reap',
  'Stung Treng',
  'Svay Rieng',
  'Takeo',
  'Tbong Khmum',
  'Phnom Penh',
].sort();

const SearchFilters = ({ onSearch, onClear, currentFilters, isSearching }) => {
  const [localFilters, setLocalFilters] = useState({
    location: '',
    max_occupancy: '',
    price: '',
    ...currentFilters
  });

  useEffect(() => {
    setLocalFilters(prev => ({ ...prev, ...currentFilters }));
  }, [currentFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  return (
    <div className="search-filters">
      <h2>Find Your Perfect Venue</h2>
      <form onSubmit={handleSubmit}>
        <div className='filter-container'>
          <div className="filter-group">
            <label>Location</label>
            <select
              name="location"
              value={localFilters.location}
              onChange={handleChange}
            >
              <option value="">-- Select Location --</option>
              {LOCATIONS.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Capacity</label>
            <input
              type="number"
              name="max_occupancy"
              value={localFilters.max_occupancy}
              onChange={handleChange}
              placeholder="Number of guests"
              min="0"
            />
          </div>

          <div className="filter-group">
            <label>Maximum Price</label>
            <input
              type="number"
              name="price"
              value={localFilters.price || ''}
              onChange={handleChange}
              placeholder="Max price"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="submit" className="search-button">
            {isSearching ? 'Update Search' : 'Search'}
          </button>
          {isSearching && (
            <button
              type="button"
              className="clear-button"
              onClick={onClear}
            >
              Clear Search
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
