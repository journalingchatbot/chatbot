const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Handle root route by serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Route
app.post('/api/data', async (req, res) => {
    try {
        res.json({
            message: "Mock response: Data fetched successfully",
            data: { someKey: "someValue" }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
