import React, { useState, useRef, useCallback } from 'react';
import './Events.css';

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const WHEEL_ZOOM_STEP = 0.15;
const CLICK_ZOOM_STEP = 0.5;

const Events = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
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

  const clampScale = (value) =>
    Number(Math.min(MAX_SCALE, Math.max(MIN_SCALE, value)).toFixed(2));

  const openZoom = (image) => {
    setZoomedImage(image);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setScale((prev) => clampScale(prev + CLICK_ZOOM_STEP));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = clampScale(prev - CLICK_ZOOM_STEP);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Smooth wheel zoom, no jumping
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScale((prev) => {
      const direction = e.deltaY < 0 ? 1 : -1;
      const next = clampScale(prev + direction * WHEEL_ZOOM_STEP);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Double-click to toggle zoom
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (scale > MIN_SCALE) {
      setScale(MIN_SCALE);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  // Drag to pan once zoomed in
  const handleMouseDown = (e) => {
    if (scale <= MIN_SCALE) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const stopDragging = () => setDragging(false);

  // Basic single-finger touch pan (mirrors mouse drag)
  const handleTouchStart = (e) => {
    if (scale <= MIN_SCALE || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setDragging(true);
    dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  };

  const handleTouchMove = (e) => {
    if (!dragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.current.x,
      y: touch.clientY - dragStart.current.y,
    });
  };

  return (
    <div className="events-container">
      <div className="main-heading">
        <h1>RITI TECH FEST 2026</h1>
        <p className="subheading">Explore the events</p>
      </div>

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

      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <button className="zoom-close" onClick={closeZoom} aria-label="Close">✕</button>
          <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
            <button onClick={zoomOut} disabled={scale <= MIN_SCALE} aria-label="Zoom out">−</button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} disabled={scale >= MAX_SCALE} aria-label="Zoom in">+</button>
          </div>
          <div
            className="zoom-image-wrapper"
            ref={wrapperRef}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={stopDragging}
          >
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className={`zoom-image ${dragging ? 'dragging' : ''}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
              onDoubleClick={handleDoubleClick}
              draggable={false}
            />
          </div>
        </div>
      )}

      <div className="fun-games">
        <h4>Enjoy Exciting Fun Games Alongside the Competitions</h4>
      </div>
    </div>
  );
};

export default Events;
