import React, { useState } from 'react';
import { Link , useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import '../components/header.css';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const users = JSON.parse(localStorage.getItem('user'));
  const nav = useNavigate()
  const handleClick = () => {
    localStorage.removeItem('user');
    nav('/')
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Toggle class on body to push down content
    if (!menuOpen) {
      //document.body.classList.add('content-push-down');
    } else {
      document.body.classList.remove('content-push-down');
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" /> KasselPortal
      </Link>

      <nav>
        {users && (
          <>
            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/courses" onClick={toggleMenu}>Courses</Link>
              <Link to="/profile" onClick={toggleMenu}>Profile</Link>
              <Link to="/about" onClick={toggleMenu}>About</Link>
              <div>
                <button onClick={() => { handleClick(); toggleMenu(); }}>Log out</button>
              </div>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
