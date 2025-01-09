import React, { useState } from 'react';
import './SearchBar.css'

const GameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Log the request URL for debugging
      console.log(`Fetching from: https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm.trim())}`);

      const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm.trim())}`);
      
      // Log the response details for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Try to get the raw response text first
      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        // Try to parse the text as JSON
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
      }

      // Validate the data structure
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of games from the server');
      }

      setGames(data);
      
    } catch (err) {
      console.error('Error fetching games:', err);
      setError(err.message || 'Failed to fetch games. Please try again.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component remains the same ...

  return (
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for games..."
            value={searchTerm}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

      {error && (
        <div style={{ color: 'red', padding: '10px', margin: '10px 0' }}>
          {error}
        </div>
      )}

      {/* ... rest of your render code remains the same ... */}
    </div>
  );
};

export default GameSearch;
