import "./GameCard.css";

const GameCard = ({ game, addToWishlist }) => {

  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} className="game-image" />
      <h3 className="game-title">{game.name}</h3>
      <div className="game-info">
        <p className="game-released">Released: {game.released}</p>
        <p className="game-rating">Rating: {game.rating}</p>
      </div>
      <div>
        <button className="wishlist-button" onClick={() => addToWishlist(game)}>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default GameCard;