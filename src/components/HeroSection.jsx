import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="cyber-hero">
      <div className="cyber-overlay"></div>
      
      <div className="cyber-content">
        <h1 className="cyber-title">
          <span className="cyber-glow">RITI</span> 
          <span className="cyber-sub">TECH FEST 11.0</span>
        </h1>
        
        <p className="cyber-desc">
          REFLECT <span className="cyber-slash">//</span> THE <span className="cyber-slash">//</span> RADIENCE
        </p>
        
        <div className="cyber-buttons">
<Link to="/register" className="cyber-button cyber-primary">
  <span className="cyber-button-text">REGISTER NOW</span>
  <span className="cyber-button-glitch"></span>
  <span className="cyber-button-gradient"></span>
</Link>

<Link to="/events" className="cyber-button cyber-secondary">
  <span className="cyber-button-text">EXPLORE EVENTS</span>
  <span className="cyber-button-glitch"></span>
</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
