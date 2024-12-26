// server.js (Node.js example)
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if using a frontend like HTML/CSS/JS)
app.use(express.static('public'));

// Define the root route
app.get('/api/data', async (req, res) => {
    const API_KEY = process.env.API_KEY;

    try {
        const response = await axios.get('https://api.example.com/data', {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
