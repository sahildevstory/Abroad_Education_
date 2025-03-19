const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/route');

const app = express();


// Replace with your frontend URL
// const allowedOrigin = 'http://192.168.29.80:5000';

app.use(cors({
    origin: '*', // Replace wildcard '*' with specific origin
    // credentials: true,     // This is important for handling credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
    allowedHeaders: '*'
}));

// Middleware
app.use(express.json());
 // Increase the limit for JSON and URL-encoded data
 app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
 app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});