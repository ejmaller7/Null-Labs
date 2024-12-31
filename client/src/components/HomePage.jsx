import { useState, useEffect } from 'react';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteamGames = async () => {
      const steamAPI = import.meta.env.VITE_STEAM_API_KEY;
      const API_URL = `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${steamAPI}&format=json`;
      
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const apps = data.applist.apps;
        
        // Sort apps by name for easier browsing
        const sortedApps = apps.sort((a, b) => a.name.localeCompare(b.name));
        
        // Return first 100 games as an example
        setGames(sortedApps.slice(0, 100));
        
      } catch (error) {
        console.error('Error fetching Steam games:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">What's Hot</h1>
      <ul className="space-y-2">
        {games.map((game) => (
          <li 
            key={game.appid}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;