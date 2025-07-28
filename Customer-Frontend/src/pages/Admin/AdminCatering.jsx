import { useState } from 'react';
import axios from '../../api/axios'; 

export default function AdminCatering() {
  const [catering_set, setCateringSet] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('catering_set', catering_set);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await axios.post('/caterings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Catering added successfully');
    } catch (error) {
      alert('Failed to add catering');
    }
  };

  return (
    <div>
      <h2>Admin - Add Catering</h2>
      <form onSubmit={handleSubmit}>
        <input value={catering_set} onChange={e => setCateringSet(e.target.value)} placeholder="Catering Set" required />
        <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" placeholder="Price" required />
        <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" />
        <button type="submit">Add Catering</button>
      </form>
    </div>
  );
}
