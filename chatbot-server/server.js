const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config(); 
const cors=require("cors");

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chatbot', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required!' });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o', 
        });


        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate response from OpenAI API.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
