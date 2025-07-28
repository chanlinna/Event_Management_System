import api from './axios'; // Assuming your axios instance is configured here

/**
 * @typedef {Object} EventData
 * @property {string} name
 * @property {string} startDate - Date string (e.g., "YYYY-MM-DD")
 * @property {string} [end_date] - Optional end date string
 * @property {string} [description]
 * @property {number} [budget]
 * @property {string} [status] - e.g., 'pending', 'accepted'
 * @property {number} eventTypeId
 * @property {number} venueId
 * @property {number} custId
 * @property {File} [eventImageFile] - The actual image file for upload (used by FormData)
 * @property {string} [imageUrl] - A URL string if image is not uploaded as a file
 * @property {number[]} [cateringIds] - Array of catering IDs
 * @property {number[]} [numOfSets] - Array of numbers of sets for catering, corresponding to cateringIds
 */

/**
 * Creates a new event.
 * If `eventData` contains a `eventImageFile`, it will send `multipart/form-data`.
 * Otherwise, it expects `imageUrl` as a string in `eventData`.
 * @param {EventData} eventData - The data for the new event.
 * @returns {Promise<Object>} The created event data from the backend.
 */
export const createEvent = async (eventData) => {
  try {
    const isFileUpload = eventData.eventImageFile instanceof File;
    let dataToSend;
    let headers = {};

    if (isFileUpload) {
      // If a file is being uploaded, use FormData
      dataToSend = new FormData();
      for (const key in eventData) {
        if (key === 'eventImageFile') {
          dataToSend.append('imageUrl', eventData.eventImageFile); // 'imageUrl' must match the field name Multer expects
        } else if (Array.isArray(eventData[key])) {
          // Append arrays correctly (e.g., cateringIds, numOfSets)
          eventData[key].forEach(item => dataToSend.append(`${key}[]`, item));
        } else {
          dataToSend.append(key, eventData[key]);
        }
      }
      // Axios automatically sets 'Content-Type': 'multipart/form-data' when sending FormData
    } else {
      // If no file, send as JSON (and expect imageUrl to be a string in eventData)
      dataToSend = { ...eventData }; // Shallow copy to avoid modifying original prop
      headers['Content-Type'] = 'application/json';
    }

    const response = await api.post('/events', dataToSend, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Fetches a list of events from the backend.
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=10] - The number of items per page.
 * @param {string} [sortBy='startDate'] - Field to sort by (e.g., 'name', 'startDateDesc', 'budget').
 * @param {Object} [filters={}] - Object with additional filters (e.g., { eventTypeId: 1, status: 'accepted' }).
 * @returns {Promise<Object>} An object containing 'data' (array of events) and 'meta' (pagination info).
 */
export const getEvents = async (page = 1, limit = 10, sortBy = 'startDate', filters = {}) => {
  try {
    const params = { page, limit, sortBy, ...filters };
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Fetches a single event by its ID.
 * @param {number|string} id - The ID of the event to fetch.
 * @returns {Promise<Object>} The event data.
 */
export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
