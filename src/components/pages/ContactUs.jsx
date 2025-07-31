// import React, { useState } from 'react';
// import { 
//   TextField, 
//   Button, 
//   Typography, 
//   Paper,
//   Box,
//   Grid
// } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faPaperPlane,
//   faUser,
//   faEnvelope,
//   faTag,
//   faComment
// } from '@fortawesome/free-solid-svg-icons';
// import './ContactUs.css';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Message transmitted successfully!");
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <Box className="contact-container">
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8}>
//           <Paper elevation={10} className="contact-form">
//             <Typography variant="h2" className="contact-title">
//               <span className="title-underline">TRANSMISSION</span> HUB
//             </Typography>
//             <Typography variant="subtitle1" className="contact-subtitle">
//               Direct line to RITI 10.0 organizers
//             </Typography>
            
//             <form onSubmit={handleSubmit} className="contact-inputs">
//               <Box className="input-field">
//                 <FontAwesomeIcon icon={faUser} className="input-icon" />
//                 <TextField
//                   name="name"
//                   label="YOUR CALLSIGN"
//                   fullWidth
//                   value={formData.name}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputProps={{ className: "input-text" }}
//                 />
//               </Box>
              
//               <Box className="input-field">
//                 <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
//                 <TextField
//                   name="email"
//                   label="FREQUENCY (EMAIL)"
//                   fullWidth
//                   value={formData.email}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputProps={{ className: "input-text" }}
//                 />
//               </Box>
              
//               <Box className="input-field">
//                 <FontAwesomeIcon icon={faTag} className="input-icon" />
//                 <TextField
//                   name="subject"
//                   label="MISSION CODE (SUBJECT)"
//                   fullWidth
//                   value={formData.subject}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputProps={{ className: "input-text" }}
//                 />
//               </Box>
              
//               <Box className="input-field">
//                 <FontAwesomeIcon icon={faComment} className="input-icon" />
//                 <TextField
//                   name="message"
//                   label="ENCRYPTED MESSAGE"
//                   fullWidth
//                   multiline
//                   rows={5}
//                   value={formData.message}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputProps={{ className: "input-text" }}
//                 />
//               </Box>
              
//               <Button
//                 variant="contained"
//                 fullWidth
//                 type="submit"
//                 className="submit-button"
//                 endIcon={<FontAwesomeIcon icon={faPaperPlane} />}
//               >
//                 INITIATE TRANSMISSION
//               </Button>
//             </form>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ContactUs;
import React from 'react';

const ContactPage = () => {
  const styles = {
    contactContainer: {
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      background: `
        radial-gradient(circle at 70% 30%, rgba(113, 28, 145, 0.3) 0%, transparent 30%),
        linear-gradient(to bottom, #000000 0%, rgba(10, 10, 18, 1) 100%)
      `,
      overflow: 'hidden',
      fontFamily: '"Orbitron", sans-serif',
      color: 'white',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
      opacity: 0.6,
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '800px',
      width: '100%',
      textAlign: 'center',
    },
    title: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      marginBottom: '1.5rem',
      letterSpacing: '3px',
      background: 'linear-gradient(90deg, rgba(10,189,198,1), rgba(255,0,170,1))',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      textShadow: '0 0 10px rgba(10, 189, 198, 0.5)',
    },
    subtitle: {
      fontSize: '1rem',
      letterSpacing: '2px',
      marginBottom: '3rem',
      color: 'rgba(255,255,255,0.7)',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '3rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      fontSize: '1.2rem',
    },
    icon: {
      color: 'rgba(10, 189, 198, 1)',
      fontSize: '1.5rem',
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '2rem',
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '1px solid rgba(10, 189, 198, 0.5)',
      color: 'white',
      fontSize: '1.5rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      ':hover': {
        background: 'rgba(10, 189, 198, 0.2)',
        boxShadow: '0 0 15px rgba(10, 189, 198, 0.5)',
        transform: 'translateY(-3px)',
      },
    },
    divider: {
      height: '1px',
      width: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(10, 189, 198, 0.5), transparent)',
      margin: '2rem 0',
    },
    cyberText: {
      fontFamily: '"Orbitron", sans-serif',
      color: 'rgba(255, 0, 170, 1)',
      margin: '0 5px',
    },
  };

  return (
    <section style={styles.contactContainer}>
      <div style={styles.overlay}></div>
      
      <div style={styles.content}>
        <h1 style={styles.title}>CONTACT US</h1>
        <p style={styles.subtitle}>
          GET IN <span style={styles.cyberText}>//</span> TOUCH
        </p>
        
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📧</span>
            <a href="mailto:techfestriti@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>
              techfestriti@gmail.com
            </a>
          </div>
          
          <div style={styles.contactItem}>
            <span style={styles.icon}>📍</span>
            <span>Department of Computer Science</span>
          </div>
        </div>
        
        <div style={styles.divider}></div>
      </div>
    </section>
  );
};

export default ContactPage;