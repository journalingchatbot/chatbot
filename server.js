require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files (HTML/CSS/JS)

// Handle the root route
app.get('/', (req, res) => {
    res.send('Welcome to my API server!');
});

// Create Axios instance for the OpenAI API
const apiClient = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
});

// API Route
console.log('Route /api/data is registered');
app.post('/api/data', (req, res) => {
    res.json({
        message: 'Mock response: Data fetched successfully',
        data: {
            someKey: 'someValue'
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
