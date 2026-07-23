import React, { useState } from 'react';
import './AboutUs.css';
import aboutImage1 from '/Hero.png'; 
import aboutImage2 from '/Hero.png';

const AboutSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2 className="section-title">
            <span className="title-number">11.0</span>
            ABOUT RITI
          </h2>
          
          <div className="glass-card about-card">
            <p>
              It is with great pleasure that the Department of Computer Science at Vimala College (Autonomous), Thrissur, 
              announcing Riti 11.0, the tenth iteration of its annual intercollegiate techno fest, on August 7, 20256.
            </p>
            <p>
              As the digital landscape continues to evolve at an unprecedented pace, we invite you to embark on 
              a journey of discovery, collaboration, and transformation.
            </p>
          </div>

          <h3 className="section-subtitle">ABOUT THE DEPARTMENT</h3>
          
          <div className="glass-card about-card">
            <p>
              The department, which was started in 1999-2000 with a B.Sc. Computer Science course, had considerable 
              growth throughout the years. The department produced many high achievers who were qualified and self-assured 
              enough to handle problems in the real world both academically and personally.
            </p>
            <p>
              We are proud of the graduates of our programmes, many of whom are employed by well-known banks (SIB, SBI, ESAF), 
              educational institutions in India and overseas, and software firms like TCS, Infosys, IBM, Wipro, CTS, 
              Sapiens Technologies, Accenture, and CGI.
            </p>
          </div>
        </div>

        <div 
          className={`image-flip-container ${isFlipped ? 'flipped' : ''}`}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div className="image-flip-front">
            <img src={aboutImage1} alt="Department Achievements" />
          </div>
          <div className="image-flip-back">
            <img src={aboutImage2} alt="Riti Fest Highlights" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
