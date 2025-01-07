import SearchBar from "./SearchBar";

const DealOfTheWeek = ({ game }) => {
  const styles = {
    container: {
      textAlign: "center",
      marginBottom: "20px",
    },
    image: {
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      objectFit: "cover",
    },
  };

  if (!game) return <p>No deal available.</p>;

  return (
    <div style={styles.container}>
      <h2>Deal of the Week</h2>
      <img src={game.background_image} alt={game.name} style={styles.image} />
      <h3>{game.name}</h3>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
    </div>
  );
};

export default DealOfTheWeek;