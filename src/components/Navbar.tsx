import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Menu.css";
import { Link } from "react-router-dom";

export function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState ? JSON.parse(savedLoginState) : false;  // Convert string to boolean
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));  // Convert boolean to string
  }, [isLoggedIn]); // Only update localStorage when isLoggedIn changes


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

  const logOut = () =>{
    setIsLoggedIn(false)
    toggleMenu()
  }

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
          <Link to="/" className="navbar-logo">
            <img className="navbar-icon" src="logo.png" alt="Site Logo" />
              TRACK AND TASTE
          </Link>
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            <Link to="/Profile">
            <img 
            className='user-icon' 
              src='user-icon.png'
              alt='User'
            />
            </Link>
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
        <div className="dropdown-menu">
           <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Recipebook">Recipe Book</Link></li>
            <li><Link to="/AddRecipe">Add Recipe</Link></li>
            <li><Link to="/CalorieTracker">Calorie Tracker</Link></li>

            <li><Link to="/Settings">Settings</Link></li>
            {isLoggedIn && <li className="logout-text" onClick={() => logOut()}>Logout</li>} {/* Trigger logout */}            {/* Add other links as needed */}
            </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
