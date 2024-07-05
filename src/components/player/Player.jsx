import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './styles.scss';
import wnjlLogo from '../../assets/wnjl.png';

// Function to detect if the OS is iOS
const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

function Player() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState('Loading...');
  const [isMuted, setIsMuted] = useState(false);
  const [albumArt, setAlbumArt] = useState(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    setIsIOSDevice(isIOS());

    const audio = new Audio("http://94.130.162.80:8020/stream");
    audioRef.current = audio;

    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));

    return () => {
      audio.removeEventListener('play', () => setPlaying(true));
      audio.removeEventListener('pause', () => setPlaying(false));
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isMuted) {
        audioRef.current.muted = true;
      } else {
        audioRef.current.muted = false;
      }
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const fetchCurrentSong = () => {
      fetch('https://ofklysyh6c.execute-api.us-east-2.amazonaws.com/prod/currentsong')
        .then(response => response.text())
        .then(data => {
          setCurrentSong(data);
          fetchAlbumArt(data);
        })
        .catch(() => setCurrentSong('Error fetching song info'));
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchAlbumArt = async (songInfo) => {
    const [artist, title] = songInfo.split(' - ');
    if (!artist || !title) return;

    try {
      const response = await axios.get(
        `https://ofklysyh6c.execute-api.us-east-2.amazonaws.com/prod/LastFmApi?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(title)}`
      );

      if (response.data.track && response.data.track.album && response.data.track.album.image) {
        const albumImages = response.data.track.album.image;
        const largeImage = albumImages.find(img => img.size === 'large') || albumImages[0];
        setAlbumArt(largeImage['#text']);
      } else {
        setAlbumArt(wnjlLogo); // Use WNJL logo if no album art is found
      }
    } catch (error) {
      console.error('Error fetching album art:', error);
      setAlbumArt(wnjlLogo); // Use WNJL logo on error
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleMute = () => {
    setIsMuted(prevIsMuted => !prevIsMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="player">
      <div className="player-controls">
        <button className="player-button" onClick={togglePlayPause}>
          {playing ? "Pause" : "Play"}
        </button>
        {!isIOSDevice && (
          <button className="player-button" onClick={handleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
        )}
      </div>
      {!isIOSDevice && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          onInput={handleVolumeChange} // Ensure immediate response on input
          className="volume-slider"
        />
      )}
      <div className="current-song">
        Currently Playing: {currentSong}
      </div>
      <div className="album-art">
        <img src={albumArt || wnjlLogo} alt="Album Art" />
      </div>
    </div>
  );
}

export default Player;