import { Link } from 'react-router-dom';
import Logo from '../assets/images/NullLabsLogo2.png';
import './NavBar.css'

const NavBar = () => {
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
                            <Link to="/featuredgames" className="header__link">Featured Games</Link>
                        </li>
                        <li>
                            <Link to="/dealoftheweek" className="header__link">Deal of the Week!</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="header__link">Profile</Link>
                        </li>
                    </ul>
                </nav>
            </header> 
        </div>
    )
}

export default NavBar;