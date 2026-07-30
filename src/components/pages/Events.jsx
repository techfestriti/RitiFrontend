import React, { useState, useRef, useCallback } from 'react';
import './Events.css';

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const WHEEL_ZOOM_STEP = 0.15;

const Events = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const wrapperRef = useRef(null);

  const brochureImages = [
    { id: 1, src: '1.png', alt: 'Event Brochure 1' },
    { id: 2, src: '2.png', alt: 'Event Brochure 2' },
    { id: 3, src: '3.png', alt: 'Event Brochure 3' },
    { id: 4, src: '4.png', alt: 'Event Brochure 4' },
    { id: 5, src: '5.png', alt: 'Event Brochure 5' },
    { id: 6, src: '6.png', alt: 'Event Brochure 6' },
    { id: 7, src: '7.png', alt: 'Event Brochure 7' },
  ];

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

  const openZoom = (image) => {
    setZoomedImage(image);
    setScale(1);
    setOrigin({ x: 50, y: 50 });
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setScale(1);
    setOrigin({ x: 50, y: 50 });
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setScale((prev) => (prev < 2.5 ? prev + 0.5 : 1));
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, MAX_SCALE));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, MIN_SCALE));
  };

  // Mouse-wheel controlled zoom, centered on cursor position
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const wrapper = wrapperRef.current;
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
      const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x: offsetX, y: offsetY });
    }

    setScale((prev) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      const next = prev + direction * WHEEL_ZOOM_STEP;
      return Number(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)).toFixed(2));
    });
  }, []);

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
            <div key={image.id} className="brochure-item" onClick={() => openZoom(image)}>
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
        <div className="zoom-overlay" onClick={closeZoom}>
          <button className="zoom-close" onClick={closeZoom} aria-label="Close">✕</button>
          <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
            <button onClick={zoomOut} disabled={scale <= 1} aria-label="Zoom out">−</button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} disabled={scale >= 3} aria-label="Zoom in">+</button>
          </div>
          <div
            className="zoom-image-wrapper"
            ref={wrapperRef}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
          >
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="zoom-image"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              onClick={handleImageClick}
              draggable={false}
            />
          </div>
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
