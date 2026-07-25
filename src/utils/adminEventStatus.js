import axios from 'axios';
import { API_URL } from '../config/api';

export const getAxiosConfig = (token) => ({
  headers: {
    'admin-auth': token,
    'Content-Type': 'application/json'
  }
});

export const getEventStatus = (participant, eventName) =>
  participant.eventStatus?.find(es => es.eventName === eventName) || { isPresent: false, paymentMethod: null };

export const markEventPresent = async (id, eventName, token) => {
  await axios.put(
    `${API_URL}/api/admin/attendance/${id}`,
    { eventName, isPresent: true },
    getAxiosConfig(token)
  );
};

export const updateEventPayment = async (id, eventName, paymentMethod, token) => {
  await axios.put(
    `${API_URL}/api/admin/payment/${id}`,
    { eventName, paymentMethod },
    getAxiosConfig(token)
  );
};

// Locally patch a list of registrations after a successful update, so the
// UI reflects the change immediately without waiting on a refetch.
export const patchEventStatus = (list, id, eventName, changes) =>
  list.map(r => {
    if (r._id !== id) return r;
    const eventStatus = (r.eventStatus || []).map(es =>
      es.eventName === eventName ? { ...es, ...changes } : es
    );
    return { ...r, eventStatus };
  });