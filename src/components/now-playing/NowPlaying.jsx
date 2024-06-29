import React, { useEffect, useState } from 'react';
import './styles.scss';

function Last20Played() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3001/last20played');
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const rows = Array.from(doc.querySelectorAll('tr'));

        // Skip the first two rows (header and current song row)
        const last20 = rows.slice(3, 23).map(row => { 
          const cells = row.querySelectorAll('td');
          if (cells.length < 2) return null;

          const rawTime = cells[0].textContent.trim();
          const [artist, title] = cells[1].textContent.split(' - ').map(item => item.trim());

          const currentDate = new Date();
          const [hours, minutes, seconds] = rawTime.split(':');
          const date = new Date(currentDate.setHours(hours, minutes, seconds));

          const estTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));

          return {
            time: estTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            artist,
            title,
          };
        }).filter(song => song !== null);

        setSongs(last20);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="last-20-played">
      <h2>Last 20 Played Songs</h2>
      <ul>
        <li className="header">
          <span className="song-time">Time Played</span>
          <span className="song-artist">Song Artist</span>
          <span className="song-title">Song Title</span>
        </li>
        {songs.map((song, index) => (
          <li key={index}>
            <span className="song-time">{song.time}</span>
            <span className="song-artist">{song.artist}</span>
            <span className="song-title">{song.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Last20Played;