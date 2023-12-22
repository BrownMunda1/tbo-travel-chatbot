const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message; // Get user's message from the request
    // Perform logic here to generate a response based on userMessage
    const botResponse = `You said: ${userMessage}. I'm a simple chatbot.`;

    res.json({ message: botResponse });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
