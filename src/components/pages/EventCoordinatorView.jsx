import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config/api';
import { EVENT_SLUGS } from '../../config/eventSlugs';
import { getEventStatus, patchEventStatus, exportEventToExcel } from '../../utils/adminEventStatus';
import './Admin.css';

const EventCoordinatorView = () => {
  const { slug } = useParams();
  const eventName = EVENT_SLUGS[slug];

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (eventName) fetchRegistrations();
  }, [eventName]);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/api/event/${encodeURIComponent(eventName)}/registrations`);
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const markPresent = async (id) => {
    try {
      await axios.put(`${API_URL}/api/event/${encodeURIComponent(eventName)}/attendance/${id}`, { isPresent: true });
      setRegistrations(list => patchEventStatus(list, id, eventName, { isPresent: true }));
    } catch (err) {
      console.error(err);
      alert('Error marking participant as present.');
    }
  };

  const updatePayment = async (id, paymentMethod) => {
    try {
      await axios.put(`${API_URL}/api/event/${encodeURIComponent(eventName)}/payment/${id}`, { paymentMethod });
      setRegistrations(list => patchEventStatus(list, id, eventName, { paymentMethod }));
    } catch (err) {
      console.error(err);
      alert('Error updating payment status.');
    }
  };

  const presentCount = registrations.filter(r => getEventStatus(r, eventName).isPresent).length;

  if (!eventName) {
    return (
      <div className="admin-page">
        <p className="admin-status-text admin-error">
          Unknown event link. Double check the URL you were given.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">{eventName}</h2>
        </div>
      </div>

      <div className="admin-summary">
        <div className="admin-summary-card">
          <span className="admin-summary-count">{registrations.length}</span>
          <span className="admin-summary-label">Registered</span>
        </div>
        <div className="admin-summary-card">
          <span className="admin-summary-count">{presentCount}</span>
          <span className="admin-summary-label">Present</span>
        </div>
      </div>

      <div className="admin-filter-row">
        <button className="admin-refresh-button" onClick={fetchRegistrations}>Refresh</button>
        <button
          className="admin-refresh-button"
          onClick={() => exportEventToExcel(registrations, eventName)}
          disabled={registrations.length === 0}
        >
          Download Excel
        </button>
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
                <th>Contact</th>
                <th>College</th>
                <th>Team</th>
                <th>Present</th>
                <th>Attendance</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr><td colSpan="7" className="admin-empty">No one has registered for this event yet.</td></tr>
              ) : (
                registrations.map(participant => {
                  const status = getEventStatus(participant, eventName);
                  const team = participant.groupTeams?.find(t => t.eventName === eventName);
                  return (
                    <tr key={participant._id}>
                      <td data-label="Name">{participant.name}</td>
                      <td data-label="Contact">{participant.contact}</td>
                      <td data-label="College">{participant.college}</td>
                      <td data-label="Team">
                        {team?.members?.length > 0 ? (
                          <ul className="admin-team-list">
                            {team.members.map((m, j) => (
                              <li key={j}>{m.name} ({m.email}, {m.contact})</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="admin-empty-inline">—</span>
                        )}
                      </td>
                      <td data-label="Present">{status.isPresent ? '✅' : '❌'}</td>
                      <td data-label="Attendance">
                        {!status.isPresent && (
                          <button className="admin-action-button" onClick={() => markPresent(participant._id)}>
                            Mark Present
                          </button>
                        )}
                      </td>
                      <td data-label="Payment">
                        <select
                          className="admin-select admin-select-small"
                          value={status.paymentMethod || ''}
                          onChange={(e) => updatePayment(participant._id, e.target.value || null)}
                        >
                          <option value="">Unpaid</option>
                          <option value="cash">Cash</option>
                          <option value="online">Online</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventCoordinatorView;
