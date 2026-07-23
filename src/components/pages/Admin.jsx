import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import { API_URL } from '../../config/api';
import './Admin.css';

const Admin = () => {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [error, setError] = useState('');

  const axiosConfig = {
    headers: {
      'admin-auth': token,
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    if (token) fetchRegistrations();
  }, [token]);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/api/admin/registrations`, axiosConfig);
      setRegistrations(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // Session expired or invalid — send back to login
        handleLogout();
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setRegistrations([]);
    setFiltered([]);
  };

  const handleEventFilter = (eventName) => {
    setSelectedEvent(eventName);
    setFiltered(
      eventName === ''
        ? registrations
        : registrations.filter(r => r.selectedEvents.includes(eventName))
    );
  };

  const markPresent = async (id) => {
    try {
      await axios.put(`${API_URL}/api/admin/attendance/${id}`, { isPresent: true }, axiosConfig);
      const update = (list) => list.map(r => (r._id === id ? { ...r, isPresent: true } : r));
      setFiltered(update);
      setRegistrations(update);
    } catch (err) {
      console.error('Error marking present:', err);
      alert('Error marking participant as present.');
    }
  };

  const updatePayment = async (id, paymentMethod) => {
    try {
      await axios.put(`${API_URL}/api/admin/payment/${id}`, { paymentMethod }, axiosConfig);
      const update = (list) => list.map(r => (r._id === id ? { ...r, paymentMethod } : r));
      setFiltered(update);
      setRegistrations(update);
    } catch (err) {
      console.error('Error updating payment:', err);
      alert('Error updating payment status.');
    }
  };

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const eventOptions = Array.from(new Set(registrations.flatMap(r => r.selectedEvents || [])));
  const eventCounts = eventOptions.map(event => ({
    event,
    count: registrations.filter(r => r.selectedEvents.includes(event)).length
  }));

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2 className="admin-title">ADMIN PANEL — REGISTERED PARTICIPANTS</h2>
        <button className="admin-logout-button" onClick={handleLogout}>Log Out</button>
      </div>

      {eventCounts.length > 0 && (
        <div className="admin-summary">
          {eventCounts.map(({ event, count }) => (
            <div key={event} className="admin-summary-card">
              <span className="admin-summary-count">{count}</span>
              <span className="admin-summary-label">{event}</span>
            </div>
          ))}
        </div>
      )}

      <div className="admin-filter-row">
        <label htmlFor="eventFilter">Filter by Event: </label>
        <select
          id="eventFilter"
          value={selectedEvent}
          onChange={(e) => handleEventFilter(e.target.value)}
          className="admin-select"
        >
          <option value="">All Events</option>
          {eventOptions.map((event, i) => (
            <option key={i} value={event}>{event}</option>
          ))}
        </select>
        <button className="admin-refresh-button" onClick={fetchRegistrations}>Refresh</button>
      </div>

      {loading ? (
        <p className="admin-status-text">Loading...</p>
      ) : error ? (
        <p className="admin-status-text admin-error">{error}</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>College</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Events</th>
                <th>Present</th>
                <th>Attendance</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="10" className="admin-empty">No participants found.</td></tr>
              ) : (
                filtered.map(participant => (
                  <tr key={participant._id}>
                    <td data-label="Name">{participant.name}</td>
                    <td data-label="Email">{participant.email}</td>
                    <td data-label="Contact">{participant.contact}</td>
                    <td data-label="College">{participant.college}</td>
                    <td data-label="Course">{participant.course}</td>
                    <td data-label="Semester">{participant.sem}</td>
                    <td data-label="Events">
                      <ul className="admin-event-list">
                        {participant.selectedEvents?.map((event, i) => (
                          <li key={i}>{event}</li>
                        ))}
                      </ul>
                    </td>
                    <td data-label="Present">{participant.isPresent ? '✅' : '❌'}</td>
                    <td data-label="Attendance">
                      {!participant.isPresent && (
                        <button className="admin-action-button" onClick={() => markPresent(participant._id)}>
                          Mark Present
                        </button>
                      )}
                    </td>
                    <td data-label="Payment">
                      <select
                        className="admin-select admin-select-small"
                        value={participant.paymentMethod || ''}
                        onChange={(e) => updatePayment(participant._id, e.target.value || null)}
                      >
                        <option value="">Unpaid</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
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

export default Admin;
