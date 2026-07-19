import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material'; // Added IconButton here
import {
  Facebook, Twitter, Instagram, LinkedIn, GitHub, YouTube
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (
    <Box className="footer-glass" component="footer">
      <div className="footer-gradient-overlay"></div>
      <Grid container spacing={4} className="footer-content">
        {/* Brand Section */}
        <Grid item xs={12} sm={6} md={3} className="footer-brand">
          <Typography variant="h6" className="footer-title">
            <span className="footer-logo">Riti</span>
            <span className="logo-iris"></span>
          </Typography>
          <Typography variant="body2" className="footer-subtitle">
            Department of Computer Science
          </Typography>
          <Typography variant="body2" className="footer-subtitle">
            Vimala College, Thrissur
          </Typography>
          <div className="footer-underline"></div>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} sm={6} md={2} className="footer-links">
          <Typography variant="subtitle1" className="footer-heading">
            Quick Links
          </Typography>
          <ul className="footer-list">
            {['Home', 'Events', 'Gallery', 'Contact', 'Register'].map((item) => (
              <li key={item} className="footer-list-item">
                <span className="link-text">{item}</span>
                <span className="link-hover"></span>
              </li>
            ))}
          </ul>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={6} md={3} className="footer-contact">
          <Typography variant="subtitle1" className="footer-heading">
            Contact Us
          </Typography>
          {[
            'Department of Computer Science',
            'Vimala College (Autonomous)',
            'Thrissur, Kerala - 680009',
            'riti@vimalacollege.edu.in',
            '+91-487-2365432'
          ].map((item) => (
            <Typography key={item} variant="body2" className="contact-item">
              {item}
            </Typography>
          ))}
        </Grid>

        {/* Google Maps Embed */}
        <Grid item xs={12} sm={6} md={4} className="map-container">
          <iframe
            title="Vimala College Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.25908271921!2d76.22687460000002!3d10.553105799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef1d21ab52ed%3A0x740c75580f212fa6!2sVimala%20College%20Thrissur!5e1!3m2!1sen!2sin!4v1752944827656!5m2!1sen!2sin" 
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            className="map-iframe"
          ></iframe>
        </Grid>
      </Grid>

      <Box className="footer-bottom">
        <Typography variant="caption" className="copyright">
          © 2026 Riti 11.0 | Department of Computer Science | Vimala College (Autonomous)
        </Typography>
        <div className="footer-iris-bar"></div>
      </Box>
    </Box>
  );
};

export default Footer;
