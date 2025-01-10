import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import Logo from '../assets/images/NullLabsLogo2.png';
import SearchBar from './SearchBar';
import './NavBar.css';

const NavBar = () => {
  const { user, logOut } = useUser();
  console.log("nav:", user)
  const navigate = useNavigate();
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);  

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
            onMouseEnter={() => setIsCategoryHovered(true)}
            onMouseLeave={() => setIsCategoryHovered(false)}
          >
            <Link to="/category" className="header__link">Category</Link>
          </li>

          <li
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <Link to="/profile" className="header__link">Profile</Link>
            {isProfileHovered && (
              <ul className="profile-dropdown">
                {user ? (
                  <>
                    <li>
                      <button onClick={() => navigate('/wishlist')}>Wishlist</button>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </>
                ) : (
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
          <li>
            <Link to="/shoppingcart" className="header__link">Shopping Cart</Link>
            </li>
        </ul>
      </nav>
      {user && <div className="welcome-message">Welcome, {user.username}!</div>}

      <div>
        <SearchBar onSearch={(term) => console.log("Search term:", term)} />
      </div>
    </header>
  );
};

export default NavBar;