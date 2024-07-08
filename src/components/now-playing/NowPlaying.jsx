import React, { useEffect, useState } from 'react';
import './styles.scss';

function Last20Played() {
  const [songs, setSongs] = useState([]);
  const [lastFetchedSongs, setLastFetchedSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await fetch('https://m1nt0kils7.execute-api.us-east-2.amazonaws.com/prod/last20played');
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

        const [hours, minutes, seconds] = rawTime.split(':');
        const currentDate = new Date();
        const utcDate = new Date(Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          hours,
          minutes,
          seconds
        ));

        // Convert UTC date to local timezone
        const localTime = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }).format(utcDate);

        return {
          time: localTime,
          artist,
          title,
        };
      }).filter(song => song !== null);

      if (JSON.stringify(lastFetchedSongs) !== JSON.stringify(last20)) {
        setLastFetchedSongs(last20);
        setSongs(last20);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
    const interval = setInterval(fetchSongs, 10000);

    return () => clearInterval(interval);
  }, [lastFetchedSongs]);

  return (
    <div className="last-20-played">
      <h2>Last 10 Played Songs</h2>
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