const express = require('express');
const axios = require('axios'); // For making API calls
const cors = require('cors');
require('dotenv').config(); // To load environment variables

const app = express();
app.use(cors()); // Enable CORS for your public chatbot
app.use(express.json()); // Parse JSON requests

// Environment variables for API keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// A route to handle chatbot requests
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body; // Message from the chatbot
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: message,
            max_tokens: 150,
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        });
        res.json(response.data); // Send the response back to your chatbot
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error handling request');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
