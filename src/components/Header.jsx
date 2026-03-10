import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/poetry', label: 'Poetry' },
  { to: '/spiritual', label: 'Spiritual' },
  { to: '/stories', label: 'Stories' },
  { to: '/gallery', label: 'Art' },
  { to: '/about', label: 'About' },
  { to: '/reflections', label: 'Reflections' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="DeepaRam Home">
            <span className="logo-diya" aria-hidden="true">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="11" cy="22" rx="8" ry="3" fill="currentColor" opacity="0.18" />
                <path d="M11 19 C11 12, 4 10, 6 5 C8 1, 14 1, 16 5 C18 10, 11 12, 11 19Z" fill="currentColor" opacity="0.22" />
                <line x1="11" y1="2" x2="11" y2="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 1 Q11 -1 13 1" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <span className="logo-text">DeepaRam</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="main-nav" aria-label="Main navigation">
            <ul className="nav-list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <ul className="mobile-nav-list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Header;
