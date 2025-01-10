import React, { useState, useRef } from "react";
import GameCard from "./GameCard";
import "./FeaturedGames.css";

const FeaturedGames = ({ games, addToWishlist }) => {
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
      sliderRef.current.scrollLeft = 0;
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }

    sliderRef.current.scrollLeft = 0;
  };

  return (
    <div className="featured-games-container">
      <h2 className="featured-games-title">Featured Games</h2>
      <button
        className="slider-button left-button"
        onClick={scrollLeft}
        disabled={currentPage === 0}
      >
        &#9664; {/* Left Arrow */}
      </button>
      <div className="slider" ref={sliderRef}>
        {paginatedGames.map((game) => (
          <GameCard key={game.id} game={game} addToWishlist={addToWishlist} />
        ))}
      </div>
      <button
        className="slider-button right-button"
        onClick={scrollRight}
        disabled={currentPage === totalPages - 1}
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default FeaturedGames;