import './Navbar.css';
import { useState } from 'react';
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div  className='navbar-logo'>
            <img className='navbar-icon' src='logo.png'/>
            TRACK AND TASTE
          </div>
          <div className='menu-icon'>
            <i className='fas fa-bars'/>
          </div>
          <div className='nav-menu'>
          {isLoggedIn ? (
              <img className='fas fa-user-circle navbar-icon' src='logo.png' />  // Shows the user icon if logged in
            ) : (
              <button onClick={() => setIsLoggedIn(true)}>Log In</button> // Shows the Log In button if not logged in
            )}
            <img className='fas fa-user-circle navbar-icon' src='logo.png'></img>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
