import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pkg from 'pg'; 
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

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

app.use(cors());

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

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});