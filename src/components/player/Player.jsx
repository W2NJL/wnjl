import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import './styles.scss';

function Player() {
  const { load, togglePlayPause, playing, volume, setVolume } = useAudioPlayer();
  const [currentSong, setCurrentSong] = useState('Loading...');
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5); // Default to halfway

  useEffect(() => {
    load("http://94.130.162.80:8020/listen.pls?sid=1", {
      html5: true,
      format: "mp3"
    });
  }, [load]);

  useEffect(() => {
    const fetchCurrentSong = () => {
      fetch('http://localhost:3001/currentsong')
        .then(response => response.text())
        .then(data => setCurrentSong(data))
        .catch(() => setCurrentSong('Error fetching song info'));
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleMute = () => {
    if (isMuted) {
      setVolume(previousVolume); // Restore previous volume
    } else {
      setPreviousVolume(volume); // Save current volume
      setVolume(0); // Mute
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="player">
      <div className="player-controls">
        <button className="player-button" onClick={togglePlayPause}>
          {playing ? "Pause" : "Play"}
        </button>
        <button className="player-button" onClick={handleMute}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          const newVolume = parseFloat(e.target.value);
          setVolume(newVolume);
          setIsMuted(newVolume === 0);
          if (!isMuted) {
            setPreviousVolume(newVolume);
          }
        }}
        className="volume-slider"
      />
      <div className="current-song">
        Currently Playing: {currentSong}
      </div>
    </div>
  );
}

export default Player;