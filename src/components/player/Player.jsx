import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import axios from 'axios';
import './styles.scss';
import wnjlLogo from '../../assets/wnjl.png';

function Player() {
  const { load, togglePlayPause, playing, volume, setVolume } = useAudioPlayer();
  const [currentSong, setCurrentSong] = useState('Loading...');
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5); // Default to halfway
  const [albumArt, setAlbumArt] = useState(null);
  const [sliderVolume, setSliderVolume] = useState(0.5); // Initial slider volume

  useEffect(() => {
    load("http://94.130.162.80:8020/listen.pls?sid=1", {
      html5: true,
      format: "mp3",
      autoplay: false,
      volume: 0.5 // Set the initial volume here
    });
  }, [load]);

  useEffect(() => {
    setVolume(0.5); // Ensure the volume is set to 0.5 after loading
    setSliderVolume(0.5); // Sync slider with initial volume
  }, [setVolume]);

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

  const handleMute = () => {
    if (isMuted) {
      setVolume(previousVolume); // Restore previous volume
    } else {
      setPreviousVolume(volume); // Save current volume
      setVolume(0); // Mute
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setSliderVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (!isMuted) {
      setPreviousVolume(newVolume);
    }
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
        value={sliderVolume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
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