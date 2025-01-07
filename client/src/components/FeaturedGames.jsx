import React, { useState, useRef } from "react";
import GameCard from "./GameCard";
import SearchBar from "./SearchBar";

const FeaturedGames = ({ games }) => {
  const styles = {
    container: {
      position: "relative",
      padding: "20px",
    },
    slider: {
      display: "flex",
      overflowX: "hidden",
      gap: "20px",
    },
    button: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      zIndex: 1,
    },
    leftButton: {
      left: "10px",
    },
    rightButton: {
      right: "10px",
    },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 10;
  const totalPages = Math.ceil(games.length / gamesPerPage);
  const sliderRef = useRef(null);

  const paginatedGames = games.slice(
    currentPage * gamesPerPage,
    currentPage * gamesPerPage + gamesPerPage
  );

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div style={styles.container}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Featured Games</h2>
    <button
      style={{ ...styles.button, ...styles.leftButton }}
      onClick={scrollLeft}
      disabled={currentPage === 0}
    >
      &#9664; {/* Left Arrow */}
    </button>
    <div style={styles.slider} ref={sliderRef}>
      {paginatedGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
    <button
      style={{ ...styles.button, ...styles.rightButton }}
      onClick={scrollRight}
      disabled={currentPage === totalPages - 1}
    >
      &#9654; {/* Right Arrow */}
    </button>
  </div>
);
};

export default FeaturedGames;