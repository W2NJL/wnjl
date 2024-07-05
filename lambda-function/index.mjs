import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/currentsong', async (req, res) => {
  try {
    const response = await fetch('http://94.130.162.80:8020/currentsong?sid=1');
    const text = await response.text();
    res.send(text);
  } catch (error) {
    res.status(500).send('Error fetching current song');
  }
});

app.get('/last20played', async (req, res) => {
  try {
    const response = await fetch('http://94.130.162.80:8020/played.html?sid=1');
    const text = await response.text();
    res.send(text);
  } catch (error) {
    res.status(500).send('Error fetching last 20 played songs');
  }
});

const handler = serverless(app);

export { handler };