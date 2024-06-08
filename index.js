const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Trello API Key , Token and listId
const API_KEY = 'ENTER-TRELLO-API-KEY';
const API_TOKEN = 'ENTER-TRELLO-API-TOKEN'; 
const LIST_ID = 'ENTER-CARD-LIST-ID';

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/create-card', async (req, res) => {

    const { name, description, dueDate, startDate } = req.body;

    try {
        const response = await axios.post(`https://api.trello.com/1/cards`, {
            name,
            desc: description,
            due: dueDate,
            start: startDate,
            idList: LIST_ID,
            key: API_KEY,
            token: API_TOKEN,
        });

        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error creating card:', error);
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
