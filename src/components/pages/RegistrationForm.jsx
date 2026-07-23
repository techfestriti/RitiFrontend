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
    idPhoto: null
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const events = [
    { id: 'codecascade', name: 'CODECASCADE - Dual-stage coding challenge' },
    { id: 'logo', name: "LOGO FLEX - Scribbles to symbols " },
    { id: 'bingo', name: 'C-TASTIC BINGO - Debug your brain, C bingo and Quiz' },
    { id: 'triathlon', name: 'TECH TRIATHLON - Think sharp. Type fast. Code blind' },
    { id: 'oracle', name: "THE ORACLE'S QUEST - Digital scavenger hunt" },
    { id: 'imagineering', name: 'IMAGINEERING SAGA - Prompt sketch quest' }
  ];

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
    const newSelected = formData.selectedEvents.includes(eventId)
      ? formData.selectedEvents.filter(id => id !== eventId)
      : [...formData.selectedEvents, eventId];

    setFormData({ ...formData, selectedEvents: newSelected });
    setErrors({ ...errors, selectedEvents: newSelected.length ? '' : 'Select at least one event' });
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (validateForm()) {
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

        const response = await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          body: formPayload
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitStatus({ success: true, message: data.message });
          setFormData({
            name: '',
            email: '',
            contact: '',
            college: '',
            course: '',
            sem: '',
            selectedEvents: [],
            idPhoto: null
          });
        } else {
          setSubmitStatus({ success: false, message: data.error || 'Registration failed' });
        }
      } catch (error) {
        console.error(error);
        setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
      }
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

  return (
    <Box className="registration-page">
      <Box className="form-section">
        <Card className="form-card">
          <CardContent>
            <Typography variant="h3" className="form-title">
              <span className="title-highlight">REGISTER</span> FOR RITI 10.0
            </Typography>

            {submitStatus && (
              <Typography
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
                  SELECT EVENTS
                </Typography>
                <FormGroup className="events-group">
                  {events.map((event) => (
                    <FormControlLabel
                      key={event.id}
                      control={
                        <Checkbox
                          checked={formData.selectedEvents.includes(event.id)}
                          onChange={() => handleEventToggle(event.id)}
                          name={event.id}
                          className="event-checkbox"
                        />
                      }
                      label={event.name}
                      className="event-label"
                    />
                  ))}
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
              >
                COMPLETE REGISTRATION
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
