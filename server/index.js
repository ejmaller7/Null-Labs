import dotenv from 'dotenv';
import express from 'express'; 
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('*', (_req, res) => {
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});