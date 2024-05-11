//npm run dev - terminal command that starts server with nodemon so changes to server code immediately apply on live server

import express from 'express';
import cors from 'cors'
import { scrapePrice } from './scraper.js';

const app = express();

// Enable CORS for all routes - allows for HTML program to fetch from port 3000 (where the server is running)
app.use(cors());

// Define route to scrape prices
app.get('/scrape', async (req, res) => {
    try {
        console.log("route accessed")
        const { URL, VALUE } = req.query; //ask about req.query
        console.log("const declared")
        const info = await scrapePrice(URL, VALUE);
        res.status(200).json(info);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});