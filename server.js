require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
const path = require('path');
app.use(express.static(path.join(__dirname, 'docs')));

// Serve the default index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Create Axios instance for the OpenAI API
const apiClient = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
});

// API Route
console.log('Route /api/data is registered');
app.post('/api/data', async (req, res) => {
    try {
        const response = await apiClient.post('', {
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: 'Hello!' }
            ]
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.response?.data || error.message });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
