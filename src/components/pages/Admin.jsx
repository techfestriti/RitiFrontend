import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [error, setError] = useState('');

  // Base API URL configuration
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Axios config containing the required auth header from your backend middleware
  const axiosConfig = {
    headers: {
      'admin-auth': 'true',
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      // 1. FIXED PATH: Changed from /api/registrations to /api/admin/registrations
      const res = await axios.get(`${API_URL}/api/admin/registrations`, axiosConfig);
      setRegistrations(res.data);
      setFiltered(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleEventFilter = (eventName) => {
    setSelectedEvent(eventName);
    if (eventName === '') {
      setFiltered(registrations);
    } else {
      const filteredData = registrations.filter(r =>
        r.selectedEvents.includes(eventName)
      );
      setFiltered(filteredData);
    }
  };

  const markPresent = async (id) => {
    try {
      // 2. FIXED PATH & BODY: Changed path to /api/admin/attendance/:id and 
      // passed { isPresent: true } instead of looking for /present route.
      // Also fixed schema reference key from 'present' to 'isPresent'.
      await axios.put(`${API_URL}/api/admin/attendance/${id}`, { isPresent: true }, axiosConfig);
      
      const updatedFiltered = filtered.map(r =>
        r._id === id ? { ...r, isPresent: true } : r
      );
      const updatedRegistrations = registrations.map(r =>
        r._id === id ? { ...r, isPresent: true } : r
      );
      
      setFiltered(updatedFiltered);
      setRegistrations(updatedRegistrations);
    } catch (err) {
      console.error('Error marking present:', err);
      alert('Error marking participant as present.');
    }
  };

  const eventOptions = Array.from(
    new Set(registrations.flatMap(r => r.selectedEvents || []))
  );

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center' }}>Admin Panel – Registered Participants</h2>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <label htmlFor="eventFilter">Filter by Event: </label>
        <select
          id="eventFilter"
          value={selectedEvent}
          onChange={(e) => handleEventFilter(e.target.value)}
          style={{ padding: '5px 10px' }}
        >
          <option value="">All Events</option>
          {eventOptions.map((event, i) => (
            <option key={i} value={event}>{event}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div style={{
          overflowX: 'auto',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#ddd' }}>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Contact</th>
                <th style={cellStyle}>College</th>
                <th style={cellStyle}>Course</th>
                <th style={cellStyle}>Semester</th>
                <th style={cellStyle}>Events</th>
                <th style={cellStyle}>Present</th>
                <th style={cellStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>No participants found.</td></tr>
              ) : (
                filtered.map(participant => (
                  <tr key={participant._id}>
                    <td style={cellStyle}>{participant.name}</td>
                    <td style={cellStyle}>{participant.email}</td>
                    <td style={cellStyle}>{participant.contact}</td>
                    <td style={cellStyle}>{participant.college}</td>
                    <td style={cellStyle}>{participant.course}</td>
                    <td style={cellStyle}>{participant.sem}</td>
                    <td style={cellStyle}>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {participant.selectedEvents?.map((event, i) => (
                          <li key={i}>{event}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={cellStyle}>
                      {/* 3. FIXED ATTRIBUTE: Backend schema uses 'isPresent', not 'present' */}
                      {participant.isPresent ? '✅' : '❌'}
                    </td>
                    <td style={cellStyle}>
                      {!participant.isPresent && (
                        <button
                          onClick={() => markPresent(participant._id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          Mark Present
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- AT THE BOTTOM OF YOUR ADMIN.JSX FILE ---

// Update this object
const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  color: '#333',          // <--- Add this line: Sets text to dark gray
  verticalAlign: 'top'   // <--- Add this line: Keeps 'Events' list aligned to top
};

export default Admin;
