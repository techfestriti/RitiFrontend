import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

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
    const pdfFiles = {
      Brochure: 'RITI BROCHURE.pdf',
      Notice: 'events_landing.pdf'
    };

    const link = document.createElement('a');
    link.href = pdfFiles[type];
    link.download = `RITI-TechFest-2025-${type}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="events-container">
      {/* Main Heading */}
      <div className="main-heading">
        <h1>RITI TECH FEST 2026</h1>
        <p className="subheading">Explore the events</p>
      </div>

      {/* Brochure Gallery */}
      <div className="brochure-section">
        <div className="brochure-gallery">
          {brochureImages.map((image) => (
            <div
              key={image.id}
              className="brochure-item"
              onClick={() => setZoomedImage(image)}
            >
              <img src={image.src} alt={image.alt} className="brochure-image" />
              <div className="zoom-hint">🔍 Click to zoom</div>
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

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="zoom-overlay" onClick={() => setZoomedImage(null)}>
          <button
            className="zoom-close"
            onClick={() => setZoomedImage(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={zoomedImage.src}
            alt={zoomedImage.alt}
            className="zoom-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Fun Games Section */}
      <div className="fun-games">
        <h4>Enjoy Exciting Fun Games Alongside the Competitions</h4>
      </div>
    </div>
  );
};

export default Events;
