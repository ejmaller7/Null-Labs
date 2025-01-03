import { useState, useEffect } from 'react';

const HomePage = () => {
   const [games, setGames] = useState([]);
   const [loading, setLoading] = useState(true); 
   const [error, setError] = useState(null);

   const fetchSteamGames = async () => {
    setLoading(true);  
    try {
       const response = await fetch('http://localhost:4000/api/steam-games');
       
       if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
       }
 
       const data = await response.json();
       const apps = data.applist.apps;
       const sortedApps = apps.sort((a, b) => a.name.localeCompare(b.name));
       setGames(sortedApps.slice(0, 100));
    } catch (error) {
       console.error('Error fetching Steam games:', error);
       setError('Failed to fetch Steam games');  
    } finally {
       setLoading(false); 
    }
  };

   useEffect(() => {
      fetchSteamGames()
   }, []);

   return (
    <div>
        <h1>What's Hot</h1>
            <ul>
               {games.map((game) => (
                  <li key={`${game.appid}-${game.name}`}>{game.name}</li>
               ))}
            </ul>
    </div>
   )

}

export default HomePage;