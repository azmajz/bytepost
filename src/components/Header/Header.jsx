'use client';

import { useState, useEffect, useRef } from 'react';
import {
  IoMoon,
  IoSunny,
  IoMenuOutline,
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoLogOutOutline
} from 'react-icons/io5';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './Header.css';
import NextLink from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef(null);

  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              {isAuthenticated && (
                <>
                  <li>
                    <NextLink href="/write" className="nav-link">Write</NextLink>
                  </li>
                  <li>
                    <NextLink href="/myposts" className="nav-link">My Posts</NextLink>
                  </li>
                </>
              )}
              <li>
                <NextLink href="/search" className="nav-link">Search</NextLink>
              </li>
              {!isAuthenticated ? (
                <>
                  <li>
                    <NextLink href="/login" className="nav-link">Login</NextLink>
                  </li>
                  <li>
                    <NextLink href="/register" className="nav-link">Register</NextLink>
                  </li>
                </>
              ) : (
                <li className="user-menu-item">
                  <div className="user-menu" ref={userMenuRef}>
                    <button className="user-menu-btn" onClick={toggleUserMenu}>
                      <IoPersonOutline />
                      <span className="user-name-text">{getUserDisplayName()}</span>
                    </button>
                    <div className={`user-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" />
                          ) : (
                            <IoPersonOutline />
                          )}
                        </div>
                        <div className="user-details">
                          <p className="user-name">{getUserDisplayName()}</p>
                          <p className="user-email">{user?.email}</p>
                        </div>
                      </div>
                      <button className="logout-btn" onClick={handleLogout}>
                        <IoLogOutOutline />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </li>
              )}

              <li>
              <button
                className={`theme-btn theme-btn-desktop ${isDarkTheme ? 'dark' : 'light'}`}
                onClick={toggleTheme}
              >
                <IoMoon className="moon" />
                <IoSunny className="sun" />
              </button>
              </li>
            </ul>

  
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
                {isAuthenticated && (
                  <>
                    <li>
                      <NextLink href="/write" className="nav-link">Write</NextLink>
                    </li>
                    <li>
                      <NextLink href="/myposts" className="nav-link">My Posts</NextLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <NextLink href="/search" className="nav-link">
                    <IoSearchOutline />
                    <span>Search</span>
                  </NextLink>
                </li>
                {!isAuthenticated ? (
                  <>
                    <li>
                      <NextLink href="/login" className="nav-link">Login</NextLink>
                    </li>
                    <li>
                      <NextLink href="/register" className="nav-link">Register</NextLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <div className="mobile-user-info">
                        <div className="user-avatar">
                          {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" />
                          ) : (
                            <IoPersonOutline />
                          )}
                        </div>
                        <div className="user-details">
                          <p className="user-name">{getUserDisplayName()}</p>
                          <p className="user-email">{user?.email}</p>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link logout-btn-mobile" onClick={handleLogout}>
                        <IoLogOutOutline />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                )}
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