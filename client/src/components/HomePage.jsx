import DealOfTheWeek from "./DealOfTheWeek";
import FeaturedGames from "./FeaturedGames";
import SearchBar from "./SearchBar";

const HomePage = ({ games }) => {
  const dealOfTheWeek = games[0];
  const featuredGames = games.slice(1, 60); // Shows how many games there are

  return (
    <div>
      {dealOfTheWeek && <DealOfTheWeek game={dealOfTheWeek} />}
      <FeaturedGames games={featuredGames} />
      <SearchBar/>
    </div>
   )

}

export default HomePage;