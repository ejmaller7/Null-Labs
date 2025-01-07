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

  const API_URL = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(gameTitle)}`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`CheapShark API request failed: ${response.status} - ${errorDetails}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching game deals:", error);
    res.status(500).json({
      error: 'Error fetching game deals',
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