import { useState } from 'react';
import { createEvent } from '../../api/eventService';
import './AdminEvent.css';


export default function AdminEvent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [venueId, setVenueId] = useState('');
  const [eventTypeId, setEventTypeId] = useState('');
  const [custId, setCustId] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('pending');
  const [eventImageFile, setEventImageFile] = useState(null);

  const [cateringInputs, setCateringInputs] = useState([{ cateringId: '', numOfSet: 1 }]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const eventTypes = [
    'Conference', 'Workshop', 'Seminar', 'Concert', 'Festival'
  ];
  const eventStatusOptions = [
    'pending', 'denied', 'accepted'
  ];

  const handleCateringInputChange = (index, field, value) => {
    const newInputs = [...cateringInputs];
    newInputs[index][field] = value;
    setCateringInputs(newInputs);
  };

  const addCateringRow = () => {
    setCateringInputs([...cateringInputs, { cateringId: '', numOfSet: 1 }]);
  };

  const removeCateringRow = (index) => {
    setCateringInputs(cateringInputs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      if (!name || !startDate || !end_date || !venueId || !eventTypeId || !custId) {
        setErrorMessage('Please fill in all required fields: Event Name, Start Date, End Date, Venue ID, Event Type, Customer ID.');
        setLoading(false);
        return;
      }

      const venueIdNum = parseInt(venueId);
      if (isNaN(venueIdNum)) {
          setErrorMessage('Venue ID must be a number.');
          setLoading(false);
          return;
      }

      // --- REFINED CATERING PROCESSING ---
      const processedCateringInputs = cateringInputs.map(input => {
        const parsedCateringId = parseInt(input.cateringId);
        const parsedNumOfSet = parseInt(input.numOfSet);

        return {
          cateringId: isNaN(parsedCateringId) ? null : parsedCateringId, // Use null if NaN
          numOfSet: isNaN(parsedNumOfSet) ? null : parsedNumOfSet // Use null if NaN
        };
      }).filter(input => input.cateringId !== null); // Only keep rows where cateringId was a valid number

      const cateringIdsToSend = processedCateringInputs.map(input => input.cateringId);
      const numOfSetsToSend = processedCateringInputs.map(input => input.numOfSet);
      // --- END REFINED CATERING PROCESSING ---


      if (cateringIdsToSend.length > 0) {
          const invalidCateringId = cateringIdsToSend.some(id => id <= 0); // Already checked for NaN by filtering nulls
          const invalidNumOfSet = numOfSetsToSend.some(num => num === null || num < 1); // Check for nulls or less than 1
          if (invalidCateringId || invalidNumOfSet) {
              setErrorMessage('Catering IDs must be positive numbers and number of sets must be at least 1.');
              setLoading(false);
              return;
          }
      }

      const eventData = {
        name,
        description,
        startDate,
        end_date,
        venueId: venueIdNum,
        eventTypeId: parseInt(eventTypeId),
        custId: parseInt(custId),
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined,
        budget: budget ? parseFloat(budget) : undefined,
        status,
        eventImageFile: eventImageFile,
        cateringIds: cateringIdsToSend,
        numOfSets: numOfSetsToSend,
      };

      const response = await createEvent(eventData);
      setSuccessMessage(`Event "${response.event.name}" created successfully! ID: ${response.event.eventId}`);
      
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setVenueId('');
      setEventTypeId('');
      setCustId('');
      setMaxAttendees('');
      setBudget('');
      setStatus('pending');
      setEventImageFile(null);
      setCateringInputs([{ cateringId: '', numOfSet: 1 }]);

      if (document.getElementById('eventImageFile')) {
        document.getElementById('eventImageFile').value = null;
      }

    } catch (error) {
      setErrorMessage(`Failed to create event: ${error.response?.data?.message || error.message || 'An unknown error occurred'}`);
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-event-container">
      <h2>Admin - Create Event</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="admin-event-form">
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Event Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Event Description"
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            value={end_date}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venueId">Venue ID:</label>
          <input
            type="number"
            id="venueId"
            value={venueId}
            onChange={e => setVenueId(e.target.value)}
            placeholder="e.g., 1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventTypeId">Event Type:</label>
          <select
            id="eventTypeId"
            value={eventTypeId}
            onChange={e => setEventTypeId(e.target.value)}
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type, index) => (
              <option key={type} value={index + 1}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="custId">Customer ID:</label>
          <input
            type="number"
            id="custId"
            value={custId}
            onChange={e => setCustId(e.target.value)}
            placeholder="e.g., 1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxAttendees">Max Attendees:</label>
          <input
            type="number"
            id="maxAttendees"
            value={maxAttendees}
            onChange={e => setMaxAttendees(e.target.value)}
            placeholder="e.g., 100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            step="0.01"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            placeholder="e.g., 500.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {eventStatusOptions.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventImageFile">Event Image:</label>
          <input
            type="file"
            id="eventImageFile"
            name="imageUrl"
            onChange={e => setEventImageFile(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <div className="form-group catering-section">
          <label>Catering Details:</label>
          {cateringInputs.map((input, index) => (
            <div key={index} className="catering-row">
              <input
                type="number"
                min="1"
                value={input.cateringId}
                onChange={(e) => handleCateringInputChange(index, 'cateringId', e.target.value)}
                placeholder="Catering ID"
                required={cateringInputs.length > 1 || input.cateringId !== '' || input.numOfSet !== 1}
              />
              <input
                type="number"
                min="1"
                value={input.numOfSet}
                onChange={(e) => handleCateringInputChange(index, 'numOfSet', e.target.value)}
                placeholder="Number of Sets"
                required={cateringInputs.length > 1 || input.cateringId !== '' || input.numOfSet !== 1}
              />
              {cateringInputs.length > 1 && (
                <button type="button" onClick={() => removeCateringRow(index)} className="remove-catering-btn">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCateringRow} className="add-catering-btn">
            Add Catering
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}