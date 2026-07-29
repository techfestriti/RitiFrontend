import axios from 'axios';
import * as XLSX from 'xlsx';
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
// Handles both updating an existing eventStatus entry AND adding one if it
// didn't exist yet (e.g. the backend self-healed a legacy registration).
export const patchEventStatus = (list, id, eventName, changes) =>
  list.map(r => {
    if (r._id !== id) return r;
    const existing = r.eventStatus || [];
    const hasEntry = existing.some(es => es.eventName === eventName);

    const eventStatus = hasEntry
      ? existing.map(es => (es.eventName === eventName ? { ...es, ...changes } : es))
      : [...existing, { eventName, isPresent: false, paymentMethod: null, ...changes }];

    return { ...r, eventStatus };
  });

// Export a single event's registration list to a downloadable .xlsx file.
// Each teammate gets their own row directly underneath the registrant
// (marked via the "Role" / "Team Of" columns) instead of being crammed
// sideways into extra columns or squeezed into one semicolon-separated cell.
export const exportEventToExcel = (registrations, eventName) => {
  const rows = [];

  registrations.forEach(participant => {
    const status = getEventStatus(participant, eventName);
    const team = participant.groupTeams?.find(t => t.eventName === eventName);
    const members = team?.members || [];

    rows.push({
      Name: participant.name,
      Email: participant.email,
      Contact: participant.contact,
      College: participant.college,
      Course: participant.course,
      Semester: participant.sem,
      Present: status.isPresent ? 'Yes' : 'No',
      Payment: status.paymentMethod ? status.paymentMethod : 'Unpaid'
    });

    members.forEach(member => {
      rows.push({
        Name: member.name || '',
        Email: member.email || '',
        Contact: member.contact || '',
        College: member.college || '',
        Course: '',
        Semester: '',
        Present: '',
        Payment: ''
      });
    });

    // Blank spacer row so the next registrant's block is easy to spot.
    rows.push({
      Name: '', Email: '', Contact: '', College: '', Course: '', Semester: '', Present: '', Payment: ''
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns based on the longest value in each column so nothing
  // gets clipped when opened in Excel/Sheets.
  const headers = Object.keys(rows[0] || {});
  worksheet['!cols'] = headers.map(header => {
    const longest = rows.reduce((max, row) => {
      const len = String(row[header] ?? '').length;
      return len > max ? len : max;
    }, header.length);
    return { wch: Math.min(Math.max(longest + 2, 10), 40) };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

  const safeFileName = eventName.replace(/[^a-z0-9]+/gi, '_').slice(0, 60);
  XLSX.writeFile(workbook, `${safeFileName}.xlsx`);
};
