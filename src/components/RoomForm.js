import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomForm() {
  const [roomType, setRoomType] = useState('');
  const [style, setStyle] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem(
      'roomData',
      JSON.stringify({ roomType, style })
    );

    navigate('/results');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Room Type</label>
        <input
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeholder="Bedroom, Living Room..."
          required
        />
      </div>

      <div style={{ marginTop: '12px' }}>
        <label>Design Style</label>
        <input
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Modern, Minimalist..."
          required
        />
      </div>

      <button type="submit">Generate Design</button>
    </form>
  );
}

export default RoomForm;
