
import React from 'react';
import './Events.css';

const Events = () => {
  // Sample event images
  const brochureImages = [
    { id: 1, src: '2.png', alt: 'Event Brochure 1' },
    { id: 2, src: '3.png', alt: 'Event Brochure 2' },
    { id: 3, src: '4.png', alt: 'Event Brochure 3' },
    { id: 4, src: '5.png', alt: 'Event Brochure 4' },
    { id: 5, src: '6.png', alt: 'Event Brochure 5' },
    { id: 6, src: '7.png', alt: 'Event Brochure 6' },
  ];

  // Function to handle download
  const handleDownload = (type) => {
    // Replace these with your actual PDF file paths
    const pdfFiles = {
      Brochure: 'RITI BROCHURE.pdf',
      Notice: 'notice.pdf'
    };

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfFiles[type];
    link.download = `RITI-TechFest-2025-${type}.pdf`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="events-container">
      {/* Main Heading */}
      <div className="main-heading">
        <h1>RITI TECH FEST 2025</h1>
        <p className="subheading">Explore the events</p>
      </div>

      {/* Brochure Gallery */}
      <div className="brochure-section">
        <div className="brochure-gallery">
          {brochureImages.map((image) => (
            <div key={image.id} className="brochure-item">
              <img src={image.src} alt={image.alt} className="brochure-image" />
            </div>
          ))}
        </div>
        <div className="download-buttons">
          <button onClick={() => handleDownload('Brochure')} className="download-btn">
            Download Brochure
          </button>
          <button onClick={() => handleDownload('Notice')} className="download-btn">
            Download Notice
          </button>
        </div>
      </div>

      {/* AI Showcase Section */}
      <div className="ai-showcase">
        <h2>UNVEILING THE FUTURE WITH AI</h2>
        <p className="tagline">Experience The Fantasy!</p>
        <p className="event-types">TechFest | AI Showcase | Futuristic FunGames</p>
        <p className="description">
          Get ready for a tech-powered experience like never before. Dive into breathing virtual worlds, thrilling adventures, and mind blowing simulations-all through the power of VR!
        </p>
        <div className="highlight-box">
          <p className="highlight">SPOT REGISTRATION ONLY</p>
          <p>Room No: 831</p>
        </div>
        <div className="coordinators">
          <div className="coordinator">
            <h4>FACULTY COORDINATOR</h4>
            <p>Ms Smitha C - 9633610523</p>
          </div>
          <div className="coordinator">
            <h4>STUDENT COORDINATOR</h4>
            <p>Kalyani K - 9207615096</p>
          </div>
        </div>
      </div>

      {/* Fun Games Section */}
      <div className="fun-games">
        <h2>FUN GAMES</h2>
        <p className="subheading">FUNFINITY</p>
        <div className="games-list">
          <ul>
            <li>PROMPT SKETCH TWIST</li>
            <li>CHESS PUZZLES</li>
            <li>KEYBOARD KEY MATCH</li>
            <li>IMAGE PUZZLES</li>
            <li>CARD TOWER</li>
            <li>CUP TOWER WITH STABLE</li>
            <li>MEMORY QUEST</li>
            <li>GUESS THE SONG</li>
            <li>KEYBOARD BUILD</li>
            <li>RUBIX SOLVING</li>
            <li>APP ICON IDENTIFYING</li>
          </ul>
        </div>
        <div className="game-details">
          <p>10.00 AM - 3.30 PM Room No: 826</p>
          <div className="coordinators">
            <div className="coordinator">
              <h4>FACULTY COORDINATOR</h4>
              <p>Ms Smitha C - 9633610523</p>
            </div>
            <div className="coordinator">
              <h4>STUDENT COORDINATOR</h4>
              <p>Kalyani K - 9207615096</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
