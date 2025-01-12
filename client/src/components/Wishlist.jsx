import React from 'react';
import { useUser } from '../context/UserContext'; 
import './Wishlist.css'

const Wishlist = ({ wishlist }) => {
  const { user } = useUser(); 

  if (!user) {
    return <p>Please sign in to view your wishlist</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((game) => (
            <li key={game.id}>
              <img src={game.background_image} alt={game.name} />
              <span className="game-title">{game.name}</span>
              <div className="game-info">
                <p className="game-released">Released: {game.released}</p>
                <p className="game-rating">Rating: {game.rating}</p>
              </div>
              <button className="wishlist-button">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default Wishlist;