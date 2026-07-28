
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
        <h1>RITI TECH FEST 2026</h1>
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

     

      {/* Fun Games Section */}
      <div className="fun-games">
        <h2>Enjoy Exciting Fun Games Alongside the Competitions</h2>
      
      </div>
    </div>
  );
};

export default Events;
