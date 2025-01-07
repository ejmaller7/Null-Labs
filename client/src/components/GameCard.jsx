import "./GameCard.css";

const GameCard = ({ game }) => {
  const price = (Math.random() * (60 - 10) + 10).toFixed(2);

  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} className="game-image" />
      <h3 className="game-title">{game.name}</h3>
      <div className="game-info">
        <p className="game-released">Released: {game.released}</p>
        <p className="game-rating">Rating: {game.rating}</p>
        <p className="game-price">Price: ${price}</p>
      </div>
    </div>
  );
};

export default GameCard;