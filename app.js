const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
// Initialize app with top level express app
const app = express();

// Configure environment variable
dotenv.config({ path: './config.env' });

// Implement cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default endpoints
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome." });
});

// User routes
app.use('/api/v1', userRouter);

// Wildcard Route
app.all("*", (req, res, next) => {
  res.status(400).json({ message: `Can't ${req.method} request on this ${req.originalUrl} URL` });
  next();
});

module.exports = app;