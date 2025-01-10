import DealOfTheWeek from "./DealOfTheWeek";
import FeaturedGames from "./FeaturedGames";

const HomePage = ({ games, addToWishlist }) => {
  const dealOfTheWeek = games[0];
  const featuredGames = games.slice(1, 60); // Shows how many games there are

  return (
    <div>
      {dealOfTheWeek && <DealOfTheWeek game={dealOfTheWeek} />}
      <FeaturedGames games={featuredGames} addToWishlist={addToWishlist} />
    </div>
   )

}

export default HomePage;