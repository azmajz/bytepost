'use client';
import { useTheme } from '@/context/ThemeContext';
import './Loader.css';

const Loader = () => {
  useTheme(); // triggers re-render on theme change
  return (
    <div
      className="loader-overlay"
      role="status"
      aria-live="polite"
    >
      <div
        id="loading"
        aria-label="Loading"
      />
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader; 