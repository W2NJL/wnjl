import fetch from 'node-fetch';

export const handler = async (event) => {
  const lastfmApiKey = process.env.LASTFM_API_KEY;
  console.log("Event:", JSON.stringify(event, null, 2)); // Add this line to log the event object

  const queryStringParameters = event.queryStringParameters || {};
  const { artist = '', track = '' } = queryStringParameters;

  if (!artist || !track) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: 'Artist and track parameters are required' }),
    };
  }

  const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${lastfmApiKey}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: 'Error fetching data from LastFM' }),
    };
  }
};