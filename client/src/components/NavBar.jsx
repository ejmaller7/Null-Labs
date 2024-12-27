import { Link } from 'react-router-dom';
import Logo from '../assets/images/NullLabsLogo.png';

const NavBar = () => {
    return (
        <div>
           <header>
                <div>
                    <img src={Logo} alt="NullLabsLogo"/>
                    <h1>Null Labs</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/featuredgames">Featured Games</Link>
                        </li>
                        <li>
                            <Link to="/dealoftheweek">Deal of the Week!</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </nav>
            </header> 
        </div>
    )
}

export default NavBar;