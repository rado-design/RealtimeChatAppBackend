import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './src/routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
const dbUrl = process.env.ATLAS_DB_URL;
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', router);

export default app;