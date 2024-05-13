//npm run dev - terminal command that starts server with nodemon so changes to server code immediately apply on live server
//npx kill-port 3000 - command that kills port 3000 (can replace 3000 with whatever)
//https://stackoverflow.com/questions/15718649/how-to-publish-a-website-made-by-node-js-to-github-pages - possible server hosts

import express from 'express';
import cors from 'cors'
import { scrapePrice } from './scraper.js';

const app = express();

// Enable CORS for all routes - allows for HTML program to fetch from port 3000 (where the server is running)
app.use(cors());

// Define route to scrape prices
app.get('/scrape', async (req, res) => {
    try {
        const { URL, VALUE } = req.query;
        const info = await scrapePrice(URL, VALUE);
        res.status(200).json(info);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});