const Wishlist = ({ wishlist, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <p>Please sign in to view your wishlist</p>
  }

  return (
    <div>
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
        ) : (
            <ul>
                {wishlist.map((game) => (
                    <li key={game.id}>
                    <img src={game.background_image} alt={game.name} style={{ width: "50px", marginRight: "10px" }} />
                    {game.name}
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};  

export default Wishlist;