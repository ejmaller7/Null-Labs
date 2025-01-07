import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from './components/NavBar';
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Wishlist from "./components/Wishlist";
import Footer from './components/Footer';
import SearchBar from "./components/SearchBar";

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&page=1&page_size=100` // Fetch up to 100 games
        );
        if (!response.ok) {
          throw new Error("Failed to fetch games from RAWG API");
        }
        const data = await response.json();
        setGames(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGames();
  }, []);

 (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage games={games} />} /> {/* Pass games to HomePage */}
        <Route path="/category/:category" element={<CategoryPage games={games} />} /> {/* Pass games to CategoryPage */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </Router>
  );
};

function SearchBar() {
  const handleSearch = (searchTerm) => {
    // Perform your search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Rest of your app's content */}
    </div>
  );
}
export default App;