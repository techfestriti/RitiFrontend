import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FloatingSocialBar from './components/FloatingSocialBar';
import AboutUs from './components/AboutUs';
import ContactUs from './components/pages/ContactUs';
import RegistrationForm from './components/pages/RegistrationForm';
import Events from './components/pages/Events';
import Gallery from './components/pages/Gallery';
import CountdownTimer from './components/CountdownTimer';
import Sponsors from './components/Sponsors';
import ScrollToTopButton from './components/ScrollToTopButton';
import Admin from './components/pages/Admin';
import ComingSoon from './components/pages/ComingSoon';

const Home = () => (
  <>
    <HeroSection />
    {/* <FloatingSocialBar /> */}
    <CountdownTimer targetDate="2025-08-20T10:00:00" />
    <AboutUs />
    {/* <Sponsors/> */}
    
  </>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={    <ContactUs/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={    <ComingSoon/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </Router>
  );
};

export default App;
