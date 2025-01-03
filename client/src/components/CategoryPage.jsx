import { useParams } from "react-router-dom";
import GameCard from "./GameCard";

const CategoryPage = ({ games }) => {
  const { category } = useParams();

  const styles = {
    container: {
      padding: "20px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      textTransform: "capitalize",
      fontSize: "24px",
      fontWeight: "bold",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      justifyContent: "center",
    },
  };

  // Filter games based on category
  const filteredGames = games.filter((game) =>
    game.genres.some((genre) => genre.name.toLowerCase() === category.toLowerCase())
  );

  if (filteredGames.length === 0) {
    return <p style={{ textAlign: "center" }}>No games found in the "{category}" category.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{category} Games</h2>
      <div style={styles.grid}>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;