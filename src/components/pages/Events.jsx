import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUser,
  faCalendarAlt,
  faMapMarkerAlt,
  faMoneyBillWave,
  faTrophy,
  faPaperPlane,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import './Events.css';

const Event = () => {
  const navigate = useNavigate();

 const events = [
    {
      id: 1,
      name: 'CODECASCADE',
      title: 'The Dual-Stage Coding Challenge',
      type: 'Group Event (2 Participants)',
       time: '1:30 PM – 3:00 PM',
      venue: 'Computer Lab 1',
      fee: '₹100 per team',
      prize: '₹3000',
      rules: [
        'Round 1 – Riddle Matrix: Solve a riddle to find the programming topic (15 mins)',
        'Round 2 – The Flow Forge: Create a flowchart on paper based on the topic (20 mins)',
        'Round 3 – CodeCore Showdown: Second player codes the solution in C based on flowchart (25 mins)',
        'Elimination after each round',
        'Strict supervision',
        'Mobile phones prohibited',
        'Winners: Team with accurate output across all rounds'
      ],
      icon: faUsers
    },
    {
      id: 2,
      name: 'LOGOFLEX',
      title: 'Scribbles to Symbols',
      type: 'Individual Event',
      time: '10:00 AM – 11:00 AM',
      venue: 'BOV Lab',
      fee: '₹50 per participant',
      prize: '₹2000',
      rules: [
        'Design a logo using Adobe Photoshop or Illustrator',
        'Can use text, images, or graphics',
        'Judged on Creativity, Relevance, Design Quality',
        'No internet or gadgets allowed',
        'Systems provided',
        'Non-compliance leads to disqualification'
      ],
      icon: faUser
    },
    {
      id: 3,
      name: 'C-TASTIC BINGO',
      title: 'Debug Your Brain – C Bingo + Quiz',
      type: 'Group Event (2 Participants)',
      time: '1:30 PM – 3:00 PM',
      venue: 'Computer Lab 1',
      fee: '₹100 per team',
      prize: '₹2500',
      rules: [
        'Level 1 – Bingo: C programming terms, mark rows/columns/diagonals to strike letters in "BINGO"',
        'Level 2 – Historical Timeline:',
        '   - Match-the-year quiz',
        '   - Card activity to arrange C programming events chronologically',
        'Strict supervision',
        'No electronic devices allowed'
      ],
      icon: faUsers
    },
    {
      id: 4,
      name: 'TECH TRIATHLON',
      title: 'Think Sharp. Type Fast. Code Blind.',
      type: 'Individual Event',
      time: '1:30 PM – 3:00 PM',
      venue: 'Computer Lab 1',
      fee: '₹75 per participant',
      prize: '₹3500',
      rules: [
        '3 Knockout Rounds',
        'Round 1 – Password Cracking: Use ASCII clues (4 mins)',
        'Round 3 – Blind Coding: Type with monitor off in MS Word (6 mins)',
        'Judging:',
        '   - Round 3 performance primarily',
        '   - Tie-breakers: Cumulative performance in all rounds',
        'Electronic devices prohibited',
        'Disqualification for malpractice',
        '15 min early reporting required'
      ],
      icon: faUser
    },
    {
      id: 5,
      name: "THE ORACLE'S QUEST",
      title: 'Digital Treasure Hunt',
      type: 'Group Event (2 Players per team)',
      time: '11:30 AM – 3:00 PM',
      venue: 'Computer Lab',
      fee: '₹150 per team',
      prize: '₹4000',
      rules: [
        'Bring fully charged smartphones with internet access',
        'Theme: Percy Jackson and the Camp Half-Blood',
        'Multi-level treasure hunt',
        'Elimination-based',
        'Rule violation leads to disqualification'
      ],
      icon: faUsers
    },
    {
      id: 6,
      name: 'IMAGINEERING SAGA',
      title: 'Prompt Sketch Twist',
      type: 'Group Event (3 Participants per team)',
      time: '1:30 PM – 3:00 PM',
      venue: 'Computer Lab 1',
      fee: '₹200 per team',
      prize: '₹5000',
      rules: [
        'Round 1 – Unlock the Truth: Create a full version of a given storyline',
        'Round 2 – Visual Synthesis & Character Blueprint:',
        '   - Design a background for the story, Create image of the prime suspect',
        'Round 3 – Narrative Showcase:',
        '   - Present story + visual to the jury',
        'Judging Criteria:',
        '   - Creativity,Presentation,Imagination',
        'Each participant handles one round',
        'Systems provided'
      ],
      icon: faUsers
    }
  ];
  const generalRules = [
    'Valid college ID required',
    'Registration fees non-refundable',
    'Judges decisions are final',
    'Strict anti-cheating policy',
    'Report 15 minutes before event'
  ];

  return (
    <div className="event-container">
      <h1 className="page-title">RITI 10.0 EVENTS</h1>

      {/* 3x2 Event Grid */}
      <div className="event-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3 className="event-name">{event.name}</h3>
            <p className="event-title">{event.title}</p>
            
            <div className="event-detail">
              <FontAwesomeIcon icon={event.icon} className="detail-icon" />
              <span>{event.type}</span>
            </div>
            
            <div className="event-detail">
              <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
              <span>{event.time}</span>
            </div>
            
            <div className="event-detail">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
              <span>{event.venue}</span>
            </div>
            
            <div className="event-detail">
              <FontAwesomeIcon icon={faMoneyBillWave} className="detail-icon" />
              <span>Fee: {event.fee}</span>
            </div>
            
            <div className="event-detail">
              <FontAwesomeIcon icon={faTrophy} className="detail-icon" />
              <span>Prize: {event.prize}</span>
            </div>
            
            {/* Event-specific rules */}
            <ul className="event-rules">
              {event.rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* General Rules Section */}
      {/* <div className="rules-section">
        <h2 className="section-title">GENERAL RULES</h2>
        <ul className="rules-list">
          {generalRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div> */}

      {/* Action Buttons */}
      {/* <div className="action-buttons">
        <button 
          className="register-button"
          onClick={() => navigate('/register')}
        >
          <FontAwesomeIcon icon={faPaperPlane} /> REGISTER NOW
        </button>
        
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} /> DOWNLOAD BROCHURE
        </button>
      </div> */}
    </div>
  );
};

export default Event;