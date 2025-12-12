const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  database: process.env.POSTGRES_DB || 'sampledb',
  password: process.env.POSTGRES_PASSWORD || 'example',
  port: 5432,
});

app.get('/health', (req, res) => res.send('API is healthy'));
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ message: 'Hello from Docker API!', dbTime: result.rows[0].now });
});

app.listen(port, () => console.log(`API running on port ${port}`));

