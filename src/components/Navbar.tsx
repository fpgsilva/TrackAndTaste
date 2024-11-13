import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Menu.css";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to dropdown menu
  const menuIconRef = useRef<HTMLDivElement>(null); // Reference to menu icon

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu open/close
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the dropdown and menu icon
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      menuIconRef.current &&
      !menuIconRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false); // Close the menu
    }
  };

  useEffect(() => {
    // Add event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  
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
          <div className="menu-icon" onClick={toggleMenu} ref={menuIconRef}>
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
        <div className="dropdown-menu" ref={dropdownRef}>
          <ul>
            <li>
              <Link to="/Recipebook">Recipe Book</Link>
            </li>
            <li>
              <a href="/add-recipe.html">Add Recipe</a>
            </li>
            <li>
              <a href="/calorie-track.html">Calorie Track</a>
            </li>
            <li>
              <a href="/Nutritionist.html">Nutritionist</a>
            </li>
            <li>
              <a href="/Profile.html">Profile</a>
            </li>
            <li>
              <a href="/Settings.html">Settings</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
