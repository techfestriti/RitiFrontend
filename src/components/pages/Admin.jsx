import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { API_URL } from '../../config/api';
import { getAxiosConfig, getEventStatus, updateEventPayment, patchEventStatus, exportEventToExcel } from '../../utils/adminEventStatus';
import { EVENT_NAME_TO_SLUG } from '../../config/eventSlugs';
import './Admin.css';

const Admin = () => {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [error, setError] = useState('');

  const axiosConfig = getAxiosConfig(token);

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
        handleLogout();
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (newToken) => setToken(newToken);

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

  const setPresence = async (id, eventName, isPresent) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/attendance/${id}`,
        { eventName, isPresent },
        axiosConfig
      );
      const update = (list) => patchEventStatus(list, id, eventName, { isPresent });
      setFiltered(update);
      setRegistrations(update);
    } catch (err) {
      console.error('Error updating attendance:', err);
      alert('Error updating attendance status.');
    }
  };

  const updatePayment = async (id, eventName, paymentMethod) => {
    try {
      await updateEventPayment(id, eventName, paymentMethod, token);
      const update = (list) => patchEventStatus(list, id, eventName, { paymentMethod });
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
              {EVENT_NAME_TO_SLUG[event] && (
                <Link to={`/admin/${EVENT_NAME_TO_SLUG[event]}`} className="admin-summary-link">
                  Open event view →
                </Link>
              )}
              <button
                className="admin-summary-link admin-summary-export"
                onClick={() => exportEventToExcel(registrations.filter(r => r.selectedEvents.includes(event)), event)}
              >
                Download Excel
              </button>
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
                <th>Events (per-event attendance &amp; payment)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" className="admin-empty">No participants found.</td></tr>
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
                      <div className="admin-event-block-list">
                        {participant.selectedEvents?.map((event, i) => {
                          const team = participant.groupTeams?.find(t => t.eventName === event);
                          const status = getEventStatus(participant, event);
                          return (
                            <div key={i} className="admin-event-block">
                              <div className="admin-event-block-name">{event}</div>

                              {team?.members?.length > 0 && (
                                <ul className="admin-team-list">
                                  {team.members.map((m, j) => (
                                    <li key={j}>{m.name} ({m.college}, {m.email}, {m.contact})</li>
                                  ))}
                                </ul>
                              )}

                              <div className="admin-event-block-controls">
                                <span className="admin-event-present-status">
                                  {status.isPresent ? '✅ Present' : '❌ Absent'}
                                </span>
                                <button
                                  className="admin-action-button admin-reset-button"
                                  onClick={() => setPresence(participant._id, event, !status.isPresent)}
                                  title="Correct this if a coordinator marked it wrong"
                                >
                                  Reset to {status.isPresent ? 'Absent' : 'Present'}
                                </button>
                                <select
                                  className="admin-select admin-select-small"
                                  value={status.paymentMethod || ''}
                                  onChange={(e) => updatePayment(participant._id, event, e.target.value || null)}
                                >
                                  <option value="">Unpaid</option>
                                  <option value="cash">Cash</option>
                                  <option value="online">Online</option>
                                </select>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
