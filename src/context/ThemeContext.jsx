'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light theme
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('bytepost-theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bytepost-theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  // Update body class when theme changes
  useEffect(() => {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }, [isDarkTheme]);

  const value = {
    isDarkTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 