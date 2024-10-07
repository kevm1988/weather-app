// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city || 'London';
        const apiKey = 'e9b1fd375907f3227a75938578b92ab0';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});