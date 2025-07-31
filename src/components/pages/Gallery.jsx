import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import './Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate API call - replace with actual fetch
    const mockImages = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `/images/gallery/image${i + 1}.jpg`,
      alt: `Gallery image ${i + 1}`,
    }));
    setImages(mockImages);
  }, []);

  return (
    <div className="gallery-page">
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src="/videos/contactbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gallery Content */}
      <Box className="gallery-container">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          className="gallery-title"
        >
          Our Gallery
        </Typography>

        <Grid container spacing={4} className="gallery-grid">
          {images.map((img) => (
            <Grid item xs={12} sm={6} md={4} key={img.id}>
              <Paper elevation={3} className="gallery-item">
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img src={img.src} alt={img.alt} className="gallery-image" />
                </a>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Gallery;
