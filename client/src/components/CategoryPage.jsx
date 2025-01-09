import { useParams, Link } from "react-router-dom";
import GameCard from "./GameCard";
import "./CategoryPage.css";

const CategoryPage = ({ games }) => {
  const { category } = useParams();
  const categories = ["Action", "RPG", "Strategy", "Adventure", "Sports", "Shooter", "Puzzle", "Racing"];

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
      color: "white"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      justifyContent: "center",
    },
    nogames: {
      textAlign: "center",
      color: "white",
      marginTop: "20px",
      marginBottom: "20px",
      fontSize: "18px",
    }
  };

  if (!category) {
    return (
      <div className="container">
        <h2 className="title">Explore Categories</h2>
        <div className="grid">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="category-button"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const filteredGames = games.filter((game) =>
    game.genres.some((genre) => genre.name.toLowerCase() === category.toLowerCase())
  );

  if (filteredGames.length === 0) {
    return (
      <div>
        <p style={styles.nogames}>No games found in the "{category}" category.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> {category} Games</h2>
      <div style={styles.grid}>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;