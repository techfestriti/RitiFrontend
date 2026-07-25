import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputAdornment
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faSchool,
  faGraduationCap,
  faCalendarAlt,
  faIdCard,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import './RegistrationForm.css';
import { API_URL } from '../../config/api';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    college: '',
    course: '',
    sem: '',
    selectedEvents: [],
    idPhoto: null,
    teams: {} // { [eventId]: [{ name, contact }, ...] }
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusRef = React.useRef(null);

  const events = [
    { id: 'promptarena', name: 'PROMPT ARENA - Prompt Engineering', type: 'individual' },
    { id: 'visioncraft', name: 'VISION CRAFT - Prompt to Website', type: 'group', minTeammates: 1, maxTeammates: 1 },
    { id: 'cyphra', name: 'CYPHRA - Debugging', type: 'individual' },
    { id: 'vestigealibi', name: 'VESTIGE ALIBI - Crime Investigation', type: 'group', minTeammates: 1, maxTeammates: 1 },
    { id: 'synthsteel', name: 'SYNTH & STEEL - Idea Presentation', type: 'group', minTeammates: 1, maxTeammates: 2 },
    { id: 'obsidiantrail', name: 'THE OBSIDIAN TRAIL - Treasure Hunt', type: 'group', minTeammates: 2, maxTeammates: 2 },
    { id: 'memora', name: 'MEMORA - Meme Creation', type: 'individual' }
  ];

  const emptyMember = () => ({ name: '', contact: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (!value) {
      error = 'This field is required';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email address';
    } else if (name === 'contact' && !/^[6-9]\d{9}$/.test(value)) {
      error = 'Invalid phone number';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, idPhoto: file });
    setErrors({ ...errors, idPhoto: '' });
  };

  const handleEventToggle = (eventId) => {
    const event = events.find(e => e.id === eventId);
    const isSelected = formData.selectedEvents.includes(eventId);
    const newSelected = isSelected
      ? formData.selectedEvents.filter(id => id !== eventId)
      : [...formData.selectedEvents, eventId];

    const newTeams = { ...formData.teams };
    if (isSelected) {
      // Unselecting: drop its teammate data
      delete newTeams[eventId];
    } else if (event.type === 'group') {
      // Selecting a group event: start with the minimum required teammate rows
      newTeams[eventId] = Array.from({ length: event.minTeammates }, emptyMember);
    }

    setFormData({ ...formData, selectedEvents: newSelected, teams: newTeams });
    setErrors({ ...errors, selectedEvents: newSelected.length ? '' : 'Select at least one event', [`team_${eventId}`]: '' });
  };

  const addTeammate = (eventId) => {
    const event = events.find(e => e.id === eventId);
    const current = formData.teams[eventId] || [];
    if (current.length >= event.maxTeammates) return;
    setFormData({
      ...formData,
      teams: { ...formData.teams, [eventId]: [...current, emptyMember()] }
    });
  };

  const removeTeammate = (eventId, index) => {
    const event = events.find(e => e.id === eventId);
    const current = formData.teams[eventId] || [];
    if (current.length <= event.minTeammates) return;
    setFormData({
      ...formData,
      teams: { ...formData.teams, [eventId]: current.filter((_, i) => i !== index) }
    });
  };

  const handleTeammateChange = (eventId, index, field, value) => {
    const current = formData.teams[eventId] || [];
    const updated = current.map((member, i) => (i === index ? { ...member, [field]: value } : member));
    setFormData({ ...formData, teams: { ...formData.teams, [eventId]: updated } });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const requiredFields = ['name', 'email', 'contact', 'college', 'course', 'sem'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (formData.contact && !/^[6-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.selectedEvents.length) {
      newErrors.selectedEvents = 'Select at least one event';
      isValid = false;
    }

    formData.selectedEvents.forEach(eventId => {
      const event = events.find(e => e.id === eventId);
      if (event?.type !== 'group') return;

      const members = formData.teams[eventId] || [];
      const sizeLabel = event.minTeammates === event.maxTeammates
        ? `${event.minTeammates}`
        : `${event.minTeammates}-${event.maxTeammates}`;

      if (members.length < event.minTeammates || members.length > event.maxTeammates) {
        newErrors[`team_${eventId}`] = `${event.name.split(' - ')[0]} needs ${sizeLabel} teammate(s) besides yourself`;
        isValid = false;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const hasIncompleteMember = members.some(
        m => !m.name.trim() || !/^[6-9]\d{9}$/.test(m.contact.trim()) || !emailRegex.test(m.email.trim())
      );
      if (hasIncompleteMember) {
        newErrors[`team_${eventId}`] = 'Enter a name, valid email, and valid 10-digit contact number for every teammate';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      setSubmitStatus({
        success: false,
        message: 'Please fix the highlighted fields above before submitting.'
      });
      statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('contact', formData.contact);
      formPayload.append('college', formData.college);
      formPayload.append('course', formData.course);
      formPayload.append('sem', formData.sem);
      if (formData.idPhoto) {
        formPayload.append('idPhoto', formData.idPhoto);
      }

      formData.selectedEvents.forEach(eventId => {
        const eventName = events.find(event => event.id === eventId).name;
        formPayload.append('selectedEvents[]', eventName);
      });

      const groupTeams = formData.selectedEvents
        .map(eventId => events.find(e => e.id === eventId))
        .filter(event => event.type === 'group')
        .map(event => ({
          eventName: event.name,
          members: formData.teams[event.id] || []
        }));

      if (groupTeams.length > 0) {
        formPayload.append('groupTeams', JSON.stringify(groupTeams));
      }

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: data.message || 'Registration successful!' });
        setFormData({
          name: '',
          email: '',
          contact: '',
          college: '',
          course: '',
          sem: '',
          selectedEvents: [],
          idPhoto: null,
          teams: {}
        });
        setTouched({});
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus({ success: false, message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
      // Give React a tick to render the message before scrolling to it
      setTimeout(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    }
  };

  const createInput = (name, label, icon, type = 'text') => (
    <Box className="input-field">
      <TextField
        fullWidth
        type={type}
        name={name}
        label={label}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errors[name]}
        helperText={errors[name]}
        required
        className="form-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={icon} className="input-icon" />
            </InputAdornment>
          )
        }}
      />
    </Box>
  );

  const renderEventCheckbox = (event) => (
    <Box key={event.id} className="event-item">
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.selectedEvents.includes(event.id)}
            onChange={() => handleEventToggle(event.id)}
            name={event.id}
            className="event-checkbox"
          />
        }
        label={
          event.type === 'group'
            ? `${event.name} (Group of ${event.minTeammates === event.maxTeammates ? event.minTeammates + 1 : `${event.minTeammates + 1}-${event.maxTeammates + 1}`})`
            : event.name
        }
        className="event-label"
      />

      {event.type === 'group' && formData.selectedEvents.includes(event.id) && (
        <Box className="team-members-section">
          <Typography variant="caption" className="team-members-hint">
            Add your teammate{event.maxTeammates > 1 ? 's' : ''} for this event (don't include yourself)
          </Typography>

          {(formData.teams[event.id] || []).map((member, index) => (
            <Box key={index} className="team-member-row">
              <TextField
                size="small"
                label={`Teammate ${index + 1} Name`}
                value={member.name}
                onChange={(e) => handleTeammateChange(event.id, index, 'name', e.target.value)}
                className="team-member-input"
              />
              <TextField
                size="small"
                label="Email"
                value={member.email}
                onChange={(e) => handleTeammateChange(event.id, index, 'email', e.target.value)}
                className="team-member-input"
              />
              <TextField
                size="small"
                label="Contact Number"
                value={member.contact}
                onChange={(e) => handleTeammateChange(event.id, index, 'contact', e.target.value)}
                className="team-member-input"
              />
              {(formData.teams[event.id]?.length || 0) > event.minTeammates && (
                <Button
                  size="small"
                  onClick={() => removeTeammate(event.id, index)}
                  className="team-member-remove"
                >
                  Remove
                </Button>
              )}
            </Box>
          ))}

          {(formData.teams[event.id]?.length || 0) < event.maxTeammates && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => addTeammate(event.id)}
              className="team-member-add"
            >
              + Add Teammate
            </Button>
          )}

          {errors[`team_${event.id}`] && (
            <FormHelperText error className="error-text">
              {errors[`team_${event.id}`]}
            </FormHelperText>
          )}
        </Box>
      )}
    </Box>
  );

  return (
    <Box className="registration-page">
      <Box className="form-section">
        <Card className="form-card">
          <CardContent>
            <Typography variant="h3" className="form-title">
              <span className="title-highlight">REGISTER</span> FOR RITI 11.0
            </Typography>

            {submitStatus && (
              <Typography
                ref={statusRef}
                color={submitStatus.success ? "success.main" : "error"}
                className="submit-message"
              >
                {submitStatus.message}
              </Typography>
            )}

            <form onSubmit={handleSubmit} className="registration-form">
              {createInput("name", "FULL NAME", faUser)}
              {createInput("email", "EMAIL", faEnvelope, "email")}
              {createInput("contact", "WHATSAPP NUMBER", faPhone, "tel")}
              {createInput("college", "COLLEGE NAME", faSchool)}
              {createInput("course", "COURSE", faGraduationCap)}
              {createInput("sem", "SEMESTER", faCalendarAlt)}

              {/* Event Selection */}
              <Box className="events-section">
                <Typography variant="h6" className="events-title">
                  INDIVIDUAL EVENTS
                </Typography>
                <FormGroup className="events-group">
                  {events.filter(e => e.type === 'individual').map(renderEventCheckbox)}
                </FormGroup>

                <Typography variant="h6" className="events-title events-title-group">
                  GROUP EVENTS
                </Typography>
                <FormGroup className="events-group">
                  {events.filter(e => e.type === 'group').map(renderEventCheckbox)}
                </FormGroup>

                {errors.selectedEvents && (
                  <FormHelperText error className="error-text">
                    {errors.selectedEvents}
                  </FormHelperText>
                )}
              </Box>

              {/* ID Upload (optional) */}
              <Box className="upload-section">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="id-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="id-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    className="upload-button"
                    startIcon={<FontAwesomeIcon icon={faIdCard} />}
                  >
                    UPLOAD COLLEGE ID (OPTIONAL)
                  </Button>
                </label>
                {formData.idPhoto && (
                  <Typography variant="caption" className="file-name">
                    {formData.idPhoto.name}
                  </Typography>
                )}
                {errors.idPhoto && (
                  <FormHelperText error className="error-text">
                    {errors.idPhoto}
                  </FormHelperText>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                className="submit-button"
                endIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
