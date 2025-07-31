import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 999,
        background: 'rgba(0, 255, 200, 0.2)',
        border: '1px solid aqua',
        borderRadius: '50%',
        padding: '0.7rem 1rem',
        color: 'aqua',
        fontSize: '1.5rem',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
        transition: 'transform 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null;
};

export default ScrollToTopButton;
