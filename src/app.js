const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Enable CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://monster-tap-backend.onrender.com',
    ],
    optionsSuccessStatus: 200,
  })
);

// use json
app.use(express.json());

// root route
app.use('/', require('./routes'));

// error middleware
app.use(errorMiddleware);

module.exports = app;
