import api from './axios';

export const getCaterings = async (page = 1, limit = 10, sortby = 'price') => {
  try {
    const response = await api.get('/caterings', {
      params: { page, limit, sortby }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching caterings:', error);
    throw error;
  }
};

export const getCateringById = async (id, populate = []) => {
  try {
    const response = await api.get(`/caterings/${id}`, {
      params: { populate: populate.join(',') }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching catering ${id}:`, error);
    throw error;
  }
};