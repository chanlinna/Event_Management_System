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

export const searchVenues = async (params) => {
  try {
    const response = await api.get('/venues/search', {
      params: {
        location: params.location,
        max_occupancy: params.max_occupancy,
        price: params.price,
        page: params.page || 1,
        limit: params.limit || 10,
        sortby: params.sortby || 'max_occupancy'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error(error.response?.data?.error || 'Failed to search venues');
  }
};