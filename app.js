

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cache = require('memory-cache');

const app = express();
const port = 3000;
app.use(cors());
// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vue',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(bodyParser.json());

// Middleware for caching
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log('Cache hit!');
    res.json(cachedData);
  } else {
    console.log('Cache miss!');
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.put(key, body);
      res.sendResponse(body);
    };
    next();
  }
};

// CRUD operations

// Create
app.post('/users', (req, res) => {
  const { user_name, user_email, user_phone, user_address } = req.body;
  const query = 'INSERT INTO crud (user_name, user_email, user_phone, user_address) VALUES (?, ?, ?, ?)';
  db.query(query, [user_name, user_email, user_phone, user_address], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('User added successfully');
      // Clear the cache after adding a new user
      cache.clear();
    }
  });
});

// Read
app.get('/users', cacheMiddleware, (req, res) => {
  const query = 'SELECT * FROM crud';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(result);
    }
  });
});

// Update
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { user_name, user_email, user_phone, user_address } = req.body;
  const query = 'UPDATE crud SET user_name=?, user_email=?, user_phone=?, user_address=? WHERE user_id=?';
  db.query(query, [user_name, user_email, user_phone, user_address, userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User updated successfully');
      // Clear the cache after updating a user
      cache.clear();
    }
  });
});

// Delete
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM crud WHERE user_id=?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('User deleted successfully');
      // Clear the cache after deleting a user
      cache.clear();
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
