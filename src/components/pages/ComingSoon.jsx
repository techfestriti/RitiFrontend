import React from 'react';

const ComingSoon = () => {
  const styles = {
    hero: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      background: `
        radial-gradient(circle at 20% 50%, rgba(113, 28, 145, 1) 0%, transparent 30%),
        linear-gradient(to bottom, #000000 0%, rgba(10, 10, 18, 1) 100%)
      `,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Orbitron", sans-serif',
      textTransform: 'uppercase',
    },
    overlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: `
        url('https://www.transparenttextures.com/patterns/carbon-fibre.png'),
        linear-gradient(135deg, rgba(10,189,198,0.1) 0%, rgba(113,28,145,0.3) 100%)
      `,
      opacity: 0.6,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: '0 20px',
    },
    title: {
      fontSize: 'clamp(3rem, 10vw, 8rem)',
      margin: 0,
      lineHeight: 1,
      letterSpacing: '-2px',
      position: 'relative',
      textShadow: `
        0 0 10px rgba(10, 189, 198, 1),
        0 0 20px rgba(10, 189, 198, 0.5),
        0 0 30px rgba(113, 28, 145, 0.3)
      `,
    },
    glow: {
      color: 'transparent',
      background: 'linear-gradient(90deg, rgba(10,189,198,1), rgba(255,0,170,1))',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      animation: 'text-flicker 3s linear infinite',
    },
    sub: {
      display: 'block',
      fontSize: '0.4em',
      letterSpacing: '5px',
      marginTop: '10px',
      color: 'rgba(10, 189, 198, 1)',
      textShadow: '0 0 5px rgba(10, 189, 198, 1)',
    },
    desc: {
      fontSize: 'clamp(1rem, 3vw, 1.5rem)',
      margin: '2rem 0',
      color: 'white',
      letterSpacing: '3px',
    },
    slash: {
      color: 'rgba(255, 0, 170, 1)',
      margin: '0 10px',
    },
    countdown: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: '3rem',
    },
    countdownItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    countdownNumber: {
      fontSize: '2.5rem',
      color: 'rgba(10, 189, 198, 1)',
      textShadow: '0 0 10px rgba(10, 189, 198, 0.8)',
      fontFamily: '"Orbitron", sans-serif',
    },
    countdownLabel: {
      fontSize: '0.8rem',
      color: 'white',
      letterSpacing: '2px',
      marginTop: '0.5rem',
    },
    // Keyframes as objects
    '@keyframes text-flicker': {
      '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
        textShadow: `
          0 0 10px rgba(10, 189, 198, 1),
          0 0 20px rgba(10, 189, 198, 0.5),
          0 0 30px rgba(113, 28, 145, 0.3)
        `,
      },
      '20%, 24%, 55%': {
        textShadow: 'none',
      },
    },
  };

  // For production, you would need to use a CSS-in-JS solution that supports keyframes
  // This is just for demonstration
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    @keyframes text-flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        text-shadow: 
          0 0 10px rgba(10, 189, 198, 1),
          0 0 20px rgba(10, 189, 198, 0.5),
          0 0 30px rgba(113, 28, 145, 0.3);
      }
      20%, 24%, 55% {
        text-shadow: none;
      }
    }
  `;
  document.head.appendChild(styleTag);

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      
      <div style={styles.content}>
        <h1 style={styles.title}>
          <span style={styles.glow}>COMING SOON</span> 
          <span style={styles.sub}>PREPARE FOR LAUNCH</span>
        </h1>
        
        <p style={styles.desc}>
          WE'RE BUILDING <span style={styles.slash}>//</span> SOMETHING <span style={styles.slash}>//</span> AMAZING
        </p>
      </div>
    </section>
  );
};

export default ComingSoon;