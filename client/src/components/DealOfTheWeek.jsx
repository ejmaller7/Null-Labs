import './DealOfTheWeek.css'; // Ensure this is correctly imported

const DealOfTheWeek = ({ game, addToWishlist }) => {
  // Render message if no game is available
  if (!game) return <p>No deal available.</p>;

  return (
    <div className="deal-of-the-week-container">
      <h2 className="deal-of-the-week-title">Deal of the Week</h2>
      <img src={game.background_image} alt={game.name} className="deal-of-the-week-image" />
      <h3>{game.name}</h3>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
      <button 
        className="wishlist-button" 
        onClick={() => addToWishlist(game)} // Call the addToWishlist function with the game
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default DealOfTheWeek;