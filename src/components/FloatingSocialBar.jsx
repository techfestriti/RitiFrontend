import React from 'react';
import { Facebook, Instagram, Twitter, LinkedIn, GitHub, YouTube } from '@mui/icons-material';
import './FloatingSocialBar.css';

const FloatingSocialBar = () => {
  return (
    <div className="floating-social-bar">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">
        <Facebook />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
        <Instagram />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
        <Twitter />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon linkedin">
        <LinkedIn />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon github">
        <GitHub />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icon youtube">
        <YouTube />
      </a>
    </div>
  );
};

export default FloatingSocialBar;
