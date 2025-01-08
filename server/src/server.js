import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pkg from 'pg'; 
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
// import React from 'react';


dotenv.config({path: '../.env'});
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors({ origin: ['http://localhost:5173', 'https://null-labs-frontend.onrender.com'] }));

app.use(express.json());

app.post('/api/create-account', async (req, res) => {
    const { email, password, username } = req.body;
  
    //test
    console.log('Received request:', { email, password, username });

    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // add user to profile_db
      const result = await pool.query(
        'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id',
        [email, hashedPassword, username]
      );
  
      res.status(201).json({ message: 'Account created', userId: result.rows[0].id });
    } catch (error) {
      if (error.code === '23505') {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
});

app.post('/api/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Check if user exists and validate password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: 'Sign-in successful', userId: user.id, username: user.username });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.get('/api/steam-games', async (req, res) => {
//   const steamAPIKey = process.env.STEAM_API_KEY;
//   console.log("Steam API Key:", steamAPIKey);
//   const API_URL = `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${steamAPIKey}&format=json`;

//   try {
//     const response = await fetch(API_URL);

//     if (!response.ok) {
//       const errorDetails = await response.text(); 
//       throw new Error(`Steam API request failed: ${response.status} - ${errorDetails}`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching Steam games:", error);
//     res.status(500).send(`Error fetching Steam games: ${error.message}`);
//   }
// });

app.get('/api/game-deals', async (req, res) => {
  const gameTitle = req.query.title;
  
  if (!gameTitle) {
    return res.status(400).json({ error: 'Game title is required' });
  }

  try {
    // Set proper headers for CORS if needed
    res.header('Content-Type', 'application/json');
    
    const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchTerm.trim())}`);
    
    if (!response.ok) {
      throw new Error(`CheapShark API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure we're sending a proper JSON response
    res.json(data);
    
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch games',
      details: error.message 
    });
  }
});


app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});