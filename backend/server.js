import express from 'express';
import {connectDB} from './config/db.js';
import User from './routes/User.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/users', User);
app.use('/training', Training);
app.use('/result', Result);
app.use('/noisecheck', NoiseCheck);
app.use('/hearingage', HearingAge);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, HearHopper!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
