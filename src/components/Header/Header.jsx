'use client';

import { useState } from 'react';
import {
  IoMoon,
  IoSunny,
  IoMenuOutline,
  IoCloseOutline,
  IoSearchOutline
} from 'react-icons/io5';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';
import NextLink from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();

  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  return (
    <header id="header">
      <div className="container">
        <nav className="navbar">
          <NextLink href="/">
            <Image src="/logo-light.png" alt="BytePost's logo" width={180} height={40} className="logo-light header-logo-img" priority />
            <Image src="/logo-dark.png" alt="BytePost's logo" width={180} height={40} className="logo-dark header-logo-img" priority />
          </NextLink>

          <div className="btn-group">
            <NextLink href="/search" className="search-btn-mobile">
              <IoSearchOutline />
            </NextLink>

            <button
              className={`theme-btn theme-btn-mobile ${isDarkTheme ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              <IoMoon className="moon" />
              <IoSunny className="sun" />
            </button>

            <button className="nav-menu-btn" onClick={toggleMobileNav}>
              <IoMenuOutline />
            </button>
          </div>

          <div className="flex-wrapper">
            <ul className="desktop-nav">
              <li>
                <NextLink href="/" className="nav-link">Home</NextLink>
              </li>
              <li>
                <NextLink href="/search" className="nav-link">Search</NextLink>
              </li>
              <li>
                <NextLink href="/register" className="nav-link">Register</NextLink>
              </li>
            </ul>

            <button
              className={`theme-btn theme-btn-desktop ${isDarkTheme ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              <IoMoon className="moon" />
              <IoSunny className="sun" />
            </button>
          </div>

          <div className={`mobile-nav ${isMobileNavActive ? 'active' : ''}`}>
            <button className="nav-close-btn" onClick={toggleMobileNav}>
              <IoCloseOutline />
            </button>

            <div className="wrapper">
              <p className="h3 nav-title">Main Menu</p>
              <ul>
                <li>
                  <NextLink href="/" className="nav-link">Home</NextLink>
                </li>
                <li>
                  <NextLink href="/register" className="nav-link">Register</NextLink>
                </li>
                <li className="nav-item">
                  <NextLink href="/search" className="nav-link">
                    <IoSearchOutline />
                    <span>Search</span>
                  </NextLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="h3 nav-title">Topics</p>
              <ul>
                <li className="nav-item">
                  <a href="#" className="nav-link">Database</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">Accessibility</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">Web Performance</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
} 