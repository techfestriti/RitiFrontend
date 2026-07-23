// Single source of truth for the backend URL.
// Set VITE_API_URL in your Netlify env vars (Site settings -> Environment variables)
// to your live Render backend URL. Falls back to the known Render URL so
// production doesn't silently break if the env var is missing, and to
// localhost only when running the Vite dev server.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : 'https://ritibackend-1.onrender.com');
