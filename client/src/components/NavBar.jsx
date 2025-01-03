import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/images/NullLabsLogo2.png';
import './NavBar.css'

const NavBar = () => {
    const [isHovered, setIsHovered] = useState(false); 
    const [isSignedIn, setIsSignedIn] = useState(false); 
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsSignedIn(false); // Simulate log out
      };

    const handleSignIn = () => {
      setIsSignedIn(true); // Simulate log in
      navigate('/signin');
    };

    const handleCreateAccount = () => {
        navigate('/createaccount');
      };

    return (
        <div>
           <header className="header">
                <div className="header__logo-title">
                    <img src={Logo} alt="NullLabsLogo" className="header__logo"/>
                    {/* <h1 className="header__title">Null Labs</h1> */}
                </div>
                <nav className="header__nav">
                    <ul className="header__menu">
                        <li>
                            <Link to="/" className="header__link">Home</Link>
                        </li>
                        <li>
                            <Link to="/category/action" className="header__link">Action</Link>
                        </li>
                        <li>
                            <Link to="/category/rpg" className="header__link">RPG</Link>
                        </li>
                        <li>
                          <Link to="/category/strategy" className="header__link">Strategy</Link>
                        </li>
                        <li
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <Link to="/profile" className="header__link">Profile</Link>
                          {isHovered && (
                            <div className="profile-dropdown">
                              {!isSignedIn ? (
                                <>
                                  <button onClick={handleSignIn}>Sign In</button>
                                  <button onClick={handleCreateAccount}>Create Account</button> 
                                </>
                              ) : (
                                <>
                                  <Link to="/wishlist">Wishlist</Link>
                                  <button onClick={handleSignOut}>Log Out</button> 
                                </>
                              )}
                            </div>
                          )}
                        </li>
                    </ul>
                </nav>
            </header> 
        </div>
    )
}

export default NavBar;