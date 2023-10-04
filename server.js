import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.js';
import pdfRoute from './api/routes/pdfRoute.js';

// Set up Express Server
// Express for builinding APIs
const app = express();

// Middleware
// 'body-parser' is a middleware for parsing incoming request bodies in Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 'cors' is a middleware for handling Cross Origin Resource Sharing i.e to allow request from different origins
app.use(cors());

// Routes mounted on specified path
app.use('/api/pdf', pdfRoute);

// Listens for incoming requests
app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
