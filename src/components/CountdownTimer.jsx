// src/components/CountdownTimer.jsx

import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // Updated to August 13, 2025 (YYYY-MM-DD format)
    const difference = +new Date("2025-08-13") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="timer-box">
      <span className="timer-number">{timeLeft[interval]}</span>
      <span className="timer-label">{interval}</span>
    </div>
  ));

  return (
    <div className="countdown-wrapper">
      <h2 className="countdown-heading">Countdown to Riti Fest</h2>
      <div className="timer-container">
        {timerComponents.length ? timerComponents : <span>It's Time!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;