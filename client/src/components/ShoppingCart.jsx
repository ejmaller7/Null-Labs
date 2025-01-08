import {useState} from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {

    const [gameItems, setGameItems] = useState([]);  

    const addToCart = (item) => {

        const existingGame = gameItems.find((gameItem) => gameItem.id === item.id);

        if (existingGame) {

        setGameItems(gameItems.map((gameItem) => 
        gameItem.id === item.id ? { ...gameItem, qyantity: gameItem.quantity + 1 } : gameItem
    ));
    } else {
        
        setGamesItems([...gameItems, { ...item, quantity: 1}]);
    }
  }


return (
    <div>
      {/* Display cart items here */}
      <h2>Shopping Cart</h2>
      {gameItems.length === 0 ? (
        <p>No games in the cart</p>
      ) : (
        gameItems.map((item) => (
          <div key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </div>
        ))
      )}
      {/* Add to cart button for a product */}
      <button onClick={() => addToCart({ id: 1, name: 'Game 1' })}>
        Add Game 1 to Cart
      </button>
    </div>
  );
};


export default ShoppingCart;