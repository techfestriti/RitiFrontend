const Sponsors = () => {
  // Sample sponsor logos (replace with your actual image paths)
  const sponsors = [
    { id: 1, logo: "https://via.placeholder.com/150x80?text=Sponsor+1" },
    { id: 2, logo: "https://via.placeholder.com/150x80?text=Sponsor+2" },
    { id: 3, logo: "https://via.placeholder.com/150x80?text=Sponsor+3" },
    { id: 4, logo: "https://via.placeholder.com/150x80?text=Sponsor+4" },
    { id: 5, logo: "https://via.placeholder.com/150x80?text=Sponsor+5" },
    { id: 6, logo: "https://via.placeholder.com/150x80?text=Sponsor+6" },
  ];

  return (
    <div
      style={{
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 2rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
    textAlign: 'center',
  }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          color: "#333",
        }}
      >
        Our Sponsors
      </h2>

      <div
        style={{
          display: "inline-flex", // Horizontal layout
          gap: "2rem", // Space between sponsors
          padding: "0 2rem", // Side padding
          alignItems: "center",
        }}
      >
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            style={{
              flexShrink: 0, // Prevent logos from shrinking
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={sponsor.logo}
              alt={`Sponsor ${sponsor.id}`}
              style={{
                height: "100%",
                width: "auto",
                filter: "grayscale(100%)", // Optional: makes logos monochrome
                opacity: 0.8, // Optional: slight transparency
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%)";
                e.currentTarget.style.opacity = "0.8";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;