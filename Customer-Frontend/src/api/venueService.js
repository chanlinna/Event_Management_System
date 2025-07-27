// Customer-Frontend/src/api/venueService.js
import api from './axios';

export const getVenues = async (page = 1, limit = 10, sortby = 'max_occupancy') => {
  try {
    const response = await api.get('/venues', {
      params: { page, limit, sortby }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

export const getVenueById = async (id, populate = []) => {
  try {
    const response = await api.get(`/venues/${id}`, {
      params: { populate: populate.join(',') }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching venue ${id}:`, error);
    throw error;
  }
};