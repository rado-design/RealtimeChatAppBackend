const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/routes/index');
const cookieParser = require('cookie-parser')
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Connect to MongoDB
const dbUrl = process.env.ATLAS_DB_URL;
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', router);

module.exports = app