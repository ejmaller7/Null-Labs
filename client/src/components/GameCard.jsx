const GameCard = ({ game }) => {
  const styles = {
    card: {
      width: "200px",
      height: "300px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      textAlign: "center",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
    },
    image: {
      width: "100%",
      height: "140px",
      objectFit: "cover",
      borderRadius: "10px",
    },
  };

  const price = (Math.random() * (60 - 10) + 10).toFixed(2);

  return (
    <div style={styles.card}>
      <img src={game.background_image} alt={game.name} style={styles.image} />
      <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{game.name}</h3>
      <p style={{ fontSize: "14px", margin: "5px 0" }}>Released: {game.released}</p>
      <p style={{ fontSize: "14px", margin: "5px 0" }}>Rating: {game.rating}</p>
      <p style={{ fontSize: "14px", fontWeight: "bold", margin: "5px 0" }}>Price: ${price}</p>
    </div>
  );
};

export default GameCard;