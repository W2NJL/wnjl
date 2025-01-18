

import React, { useEffect, useState } from 'react';
import './LancasterAveOasis.css';

export default function LancasterAveOasis() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('https://hearthis.at/wnjl/podcast/');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        const items = Array.from(xml.querySelectorAll('item')).map((item) => {
          const title = item.querySelector('title')?.textContent || 'Unknown Title';
          const description = item.querySelector('description')?.textContent || '';
          const embedId = item.querySelector('guid')?.textContent;
          const date = new Date(item.querySelector('pubDate')?.textContent).toDateString();


          // Construct the embed code with cover enabled
          const embedCode = `
            <iframe 
              scrolling="no" 
              id="hearthis_at_track_${embedId}" 
              width="100%" 
              height="150" 
              src="https://app.hearthis.at/embed/${embedId}/transparent_black/?hcolor=&color=&style=2&block_size=1&block_space=1&background=1&waveform=0&cover=0&autoplay=0&css=" 
              frameborder="0" 
              allowtransparency 
              allow="autoplay">
            </iframe>
          `;

          // Use the full description as a single line for the playlist
          const playlist = description
            .split('<br />')
            .filter(Boolean)
            .map((line) => line.trim());

          return { title, embedCode, date, playlist };
        });

        setEpisodes(items);
      } catch (error) {
        console.error('Error fetching or parsing the RSS feed:', error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="oasis-container">
      <h1>Lancaster Ave. Oasis</h1>
      <p>Catch the latest episodes of Lancaster Ave. Oasis, updated automatically!</p>

      {episodes.map((episode, index) => (
        <div key={index} className="episode">
          <h2>{episode.title}</h2>
          <p><strong>Date:</strong> {episode.date}</p>
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{ __html: episode.embedCode }}
          ></div>
          <h3>Playlist</h3>
          <ul>
            {episode.playlist.map((track, i) => (
              <li key={i}>{track}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}