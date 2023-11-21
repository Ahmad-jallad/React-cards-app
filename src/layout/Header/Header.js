import './Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header style={{ marginBottom: 20 }}>
      <nav className="navbar">
        <a href="#" className="nav-logo">
          P&amp;A Cards.
        </a>
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/albums" className="nav-link">
              Albums
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
