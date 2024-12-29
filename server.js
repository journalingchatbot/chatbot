require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.static('public')); // Serve static files (HTML/CSS/JS)

// Create Axios instance for the OpenAI API
const apiClient = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
});

// API Route
console.log('Route /api/data is registered');
app.post('/api/data', async (req, res) => {
    try {
        // Mock response instead of calling the actual API
        res.json({ message: 'Mock response: Data fetched successfully', data: { someKey: 'someValue' } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});