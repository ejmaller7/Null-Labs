const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/steam/games', async (req, res) => {
  try {
    const steamAPI = process.env.STEAM_API_KEY;
    const API_URL = `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${steamAPI}&format=json`;
    
    console.log('Fetching from Steam API...');
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Steam API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Steam API response received:', data ? 'Data present' : 'No data');
    
    if (!data || !data.applist || !data.applist.apps) {
      throw new Error('Invalid data structure received from Steam API');
    }
    
    res.json({
      status: 'success',
      data: data
    });
  } catch (error) {
    console.error('Detailed proxy server error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message,
      details: error.toString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});