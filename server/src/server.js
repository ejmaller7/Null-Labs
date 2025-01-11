import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { sequelize, User } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken'
// import React from 'react';


dotenv.config({path: '../.env'});

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ['http://localhost:5173', 'https://null-labs-frontend.onrender.com'] }));

app.use(express.json());

// POST route to create a new user account
// This route receives user data (email, password, and username), hashes the password, 
// and then stores the user information in the database.
app.post('/api/create-account', async (req, res) => {
    const { email, password, username } = req.body;
    console.log(email, password, username);
  
    //test
    console.log('Received request:', { email, password, username });

    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // add user to profile_db
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
      });
  
      res.status(201).json({ message: 'Account created', userId: user.id });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
});

// POST route for user sign-in
// This route validates the user's credentials (email and password) 
// and returns the user's data if the credentials are correct.
app.post('/api/sign-in', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create JWT token
      const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Sign-in successful', token, userId: user.id, username: user.username, profilePic: user.profile_pic || 'default-pic-url' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route to update user profile picture
// This route receives a new profile picture URL and updates the user profile accordingly.
app.post('/api/update-profile-pic', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { profilePic, userId } = req.body;

    // Ensure the user ID in the token matches the one in the request body
    if (decoded.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: User mismatch' });
    }

    const [updated] = await User.update(
      { profile_pic: profilePic },
      { where: { id: userId } }
    );

    if (updated) {
      const user = await User.findByPk(userId);
      res.json({
        message: 'Profile picture updated successfully!',
        profile_pic: user.profile_pic,
      });
    } else {
      res.status(400).json({ message: 'Failed to update profile picture' });
    }
  } catch (error) {
    console.error('Error verifying token or updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
});

// GET route to fetch user profile information
// This route returns the profile picture of a user based on the user ID provided in the query parameters.
app.get('/api/get-user-profile', async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ profile_pic: user.profile_pic });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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

// GET route to fetch game deals
// This route queries the CheapShark API for game deals based on the title provided in the query parameter.
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

app.listen(port, async () => {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    await sequelize.authenticate();  // Add this line to test the connection
    console.log('Database connected successfully!');
    await sequelize.sync({alter: true});
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.error('Error syncing Sequelize models:', error);
  }
});