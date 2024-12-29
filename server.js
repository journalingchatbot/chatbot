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
app.get('/api/data', async (req, res) => {
    try {
        const response = await apiClient.post('/', {
            model: "gpt-4",
            messages: [
                { role: "user", content: "Hello!" }
            ]
        });
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message); // Log error for debugging
        res.status(500).json({
            error: 'Failed to fetch data',
            details: error.message // Provide detailed error info
        });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});