import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import Logo from '../assets/images/NullLabsLogo2.png';
import SearchBar from './SearchBar';
import './NavBar.css';

const NavBar = () => {
  const { user, logOut } = useUser();
  const navigate = useNavigate();
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);  

  //using logOut() funtion from UserContext to clear user data
  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo-title">
        <img src={Logo} alt="NullLabsLogo" className="header__logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li>
            <Link to="/" className="header__link">Home</Link>
          </li>
          <li
            className="category-dropdown"
            onMouseEnter={() => setIsCategoryHovered(true)} // Show dropdown on hover
            onMouseLeave={() => setIsCategoryHovered(false)} // Hide dropdown on mouse leave
          >
            <Link to="/category" className="header__link">Category</Link>
          </li>

          <li
            onMouseEnter={() => setIsProfileHovered(true)} // Show dropdown on hover
            onMouseLeave={() => setIsProfileHovered(false)} // Hide dropdown on mouse leave
          >
            <Link to="/profile" className="header__link">Profile</Link>
            {isProfileHovered && (
              <ul className="profile-dropdown">
                {user ? (
                  // If user is logged in, show Wishlist and Logout options
                  <>
                    <li>
                      <button onClick={() => navigate('/wishlist')}>Wishlist</button>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </>
                ) : (
                  // If no user is logged in, show Sign In and Create Account options
                  <>
                    <li>
                      <button onClick={() => navigate('/signin')}>Sign In</button>
                    </li>
                    <li>
                      <button onClick={() => navigate('/createaccount')}>Create Account</button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>
      {/* Welcome Message for Logged-In User */}
      {user && <div className="welcome-message">Welcome, {user.username}!</div>}

      <div>
        <SearchBar onSearch={(term) => console.log("Search term:", term)} />
      </div>
    </header>
  );
};

export default NavBar;