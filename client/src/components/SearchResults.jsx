import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('search');

  const resultStyles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)', // Account for NavBar and Footer
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    backButton: {
      padding: '8px 16px',
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      textDecoration: 'none',
      fontSize: '0.9rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '30px',
    },
    card: {
      backgroundColor: '#333',
      borderRadius: '8px',
      padding: '15px',
      color: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },
    cardContent: {
      display: 'flex',
      gap: '15px',
    },
    image: {
      width: '120px',
      height: '60px',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    info: {
      flex: 1,
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '1.1rem',
      color: 'white',
    },
    price: {
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: '#555',
      borderRadius: '4px',
      marginRight: '10px',
    },
    rating: {
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: '#444',
      borderRadius: '4px',
    },
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (!searchTerm) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm.trim())}`);
        const text = await response.text();
        
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        }

        if (!Array.isArray(data)) {
          throw new Error('Expected an array of games from the server');
        }

        setSearchResults(data);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError(err.message || 'Failed to fetch games. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchTerm]);

  if (!searchTerm) {
    return (
      <div style={resultStyles.container}>
        <p>No search term provided.</p>
        <Link to="/" style={resultStyles.backButton}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={resultStyles.container}>
      <div style={resultStyles.header}>
        <h2 style={{ color: 'white' }}>Results for "{searchTerm}"</h2>
        <Link to="/" style={resultStyles.backButton}>Back to Home</Link>
      </div>

      {loading && <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>}
      
      {error && (
        <div style={{ color: '#ff4444', padding: '10px', margin: '10px 0' }}>
          {error}
        </div>
      )}

      <div style={resultStyles.grid}>
        {searchResults.map((game) => (
          <div key={game.gameID} style={resultStyles.card}>
            <div style={resultStyles.cardContent}>
              {game.thumb && (
                <img 
                  src={game.thumb} 
                  alt={game.external} 
                  style={resultStyles.image}
                />
              )}
              <div style={resultStyles.info}>
                <h3 style={resultStyles.title}>{game.external}</h3>
                <div>
                  <span style={resultStyles.price}>
                    ${game.cheapest}
                  </span>
                  {game.steamRatingPercent && (
                    <span style={resultStyles.rating}>
                      {game.steamRatingPercent}% on Steam
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {searchResults.length === 0 && !loading && !error && (
        <div style={{ color: '#bbb', textAlign: 'center', marginTop: '30px' }}>
          No games found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchResults;