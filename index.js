const express = require('express');
const path = require('path');
const axios = require('axios');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

async function fetchData(page) {
    const response = await axios.get(`https://api.coincap.io/v2/assets?limit=10&offset=${(page - 1) * 10}`);
    return response.data.data;
}

app.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get page number from query parameter
    try {
        // Fetch data for the current page
        const assets = await fetchData(page);

        // Render the EJS template and pass data to it
        res.render('index', { assets, page });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
