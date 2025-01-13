import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { user } = useUser();
  
  // Get wishlist from localStorage
  const getWishlist = () => {
    const savedWishlist = localStorage.getItem('gameWishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  };

  const [wishlist, setWishlist] = React.useState(getWishlist());

  const removeFromWishlist = (gameId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== gameId);
    setWishlist(updatedWishlist);
    localStorage.setItem('gameWishlist', JSON.stringify(updatedWishlist));
  };

  const handleDealClick = (dealID) => {
    window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`, '_blank');
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      color: 'white',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    item: {
      backgroundColor: '#333',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    gameTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    gameInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
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
    buttonContainer: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
    viewDealButton: {
      padding: '8px 16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    removeButton: {
      padding: '8px 16px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '1.1rem',
      color: '#bbb',
      marginTop: '30px',
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
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={styles.emptyMessage}>Please sign in to view your wishlist</p>
        <Link to="/" style={styles.backButton}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Your Wishlist</h2>
        <Link to="/" style={styles.backButton}>Back to Home</Link>
      </div>
      
      {wishlist.length === 0 ? (
        <p style={styles.emptyMessage}>Your wishlist is empty.</p>
      ) : (
        <ul style={styles.list}>
          {wishlist.map((game) => (
            <li key={game.id} style={styles.item}>
              <img 
                src={game.thumb || '/placeholder-game.jpg'} 
                alt={game.name} 
                style={styles.image}
              />
              <h3 style={styles.gameTitle}>{game.name}</h3>
              <div style={styles.gameInfo}>
                <div>
                  <span style={styles.price}>
                    ${game.price}
                  </span>
                  {game.steamRating && (
                    <span style={styles.rating}>
                      {game.steamRating}% on Steam
                    </span>
                  )}
                </div>
                <p>Added: {new Date(game.dateAdded).toLocaleDateString()}</p>
              </div>
              <div style={styles.buttonContainer}>
                <button 
                  style={styles.viewDealButton}
                  onClick={() => handleDealClick(game.dealID)}
                >
                  View Deal
                </button>
                <button 
                  style={styles.removeButton}
                  onClick={() => removeFromWishlist(game.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
