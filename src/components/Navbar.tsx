import React, { useState } from "react";
import "./Navbar.css";
import "./Menu.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu open/close
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img className="navbar-icon" src="logo.png" alt="Site Logo" />
          TRACK AND TASTE
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="login-button"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="login-button"
            >
              Log In
            </button>
          )}

          {/* Hamburger Menu Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering of Dropdown Menu */}
      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/recipe-book">My Recipe Book</Link>
            </li>
            <li>
              <a href="#profile">Add Recipe</a>
            </li>
            <li>
              <a href="#settings">Calorie Track</a>
            </li>
            <li>
              <a href="#n">Nutritionist</a>
            </li>
            <li>
              <a href="#p">Profile</a>
            </li>
            <li>
              <a href="#s">Settings</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
