import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pkg from 'pg'; 
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();
console.log('STEAM_API_KEY:', process.env.STEAM_API_KEY);

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, 
});

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.post('/api/create-account', async (req, res) => {
    const { email, password } = req.body;
  
    //test
    console.log('Received request:', { email, password });

    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // add user to profile_db
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
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

app.get('/api/steam-games', async (req, res) => {
  const steamAPIKey = process.env.STEAM_API_KEY;
  console.log("Steam API Key:", steamAPIKey);
  const API_URL = `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${steamAPIKey}&format=json`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorDetails = await response.text(); 
      throw new Error(`Steam API request failed: ${response.status} - ${errorDetails}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Steam games:", error);
    res.status(500).send(`Error fetching Steam games: ${error.message}`);
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});