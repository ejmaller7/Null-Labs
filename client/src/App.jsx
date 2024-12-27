import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/HomePage';
import FeaturedGames from './components/FeaturedGames';
import DealOfTheWeek from './components/DealOfTheWeek';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';

const App = () => {

  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          {/* Routes to the specific pages that are in the NavBar */}
          <Route path="/" element={<Home />} />
          <Route path="/featuredgames" element={<FeaturedGames />} />
          <Route path="/dealoftheweek" element={<DealOfTheWeek />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/createaccount" element={<CreateAccount/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
};

export default App;
