import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
const app = express();
const port = process.env.PORT || 3000;
import connectDB from './db';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize dotenv
dotenv.config();

// Allow app to use cookies
app.use(cookies());

// Enable cors
app.use(cors());

// Define api route
import api from './routes/api';
app.use('/api', api);

// Serve public directory
app.use('/public', express.static('public'));

// Error handling middleware function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode ?? 500).send({ message: err.message });
};

app.use(errorHandler);

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
