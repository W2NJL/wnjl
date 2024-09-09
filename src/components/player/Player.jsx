import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles.scss';
import wnjlLogo from '../../assets/wnjl.png';

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
  const [previousSong, setPreviousSong] = useState('');

  useEffect(() => {
    setIsIOSDevice(isIOS());
    const audio = audioRef.current;
    audio.volume = volume;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [volume]);

  useEffect(() => {
    let interval;

    const fetchCurrentSong = () => {
      fetch('https://m1nt0kils7.execute-api.us-east-2.amazonaws.com/prod/currentsong')
        .then(response => response.text())
        .then(data => {
          if (data !== previousSong) {
            console.log('Four 80');
            setCurrentSong(data);
            setPreviousSong(data);
            fetchAlbumArt(data);
            updateMediaSession(data);
          }
        })
        .catch(() => setCurrentSong('Error fetching song info'));
    };


      fetchCurrentSong(); // Fetch immediately when playing starts
      interval = setInterval(fetchCurrentSong, 10000); // Poll every 30 seconds
    

    return () => clearInterval(interval);
  }, [playing, previousSong]);

  const fetchAlbumArt = async (songInfo) => {
    const [artist, title] = songInfo.split(' - ');
    if (!artist || !title) return;

    try {
      const response = await axios.get(
        `https://m1nt0kils7.execute-api.us-east-2.amazonaws.com/prod/LastFmApi?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(title)}`
      );

      if (response.data.track && response.data.track.album && response.data.track.album.image) {
        const albumImages = response.data.track.album.image;
        const largeImage = albumImages.find(img => img.size === 'large') || albumImages[0];
        setAlbumArt(largeImage['#text']);
      } else {
        setAlbumArt(wnjlLogo);
      }
    } catch (error) {
      console.error('Error fetching album art:', error);
      setAlbumArt(wnjlLogo);
    }
  };

  const updateMediaSession = (songInfo) => {
    if ('mediaSession' in navigator) {
      const [artist, title] = songInfo.split(' - ');
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: title || 'Unknown Title',
        artist: artist || 'Unknown Artist',
        album: 'WNJL Radio',
        artwork: [
          { src: albumArt || wnjlLogo, sizes: '512x512', type: 'image/png' }
        ]
      });
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
    const audio = audioRef.current;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    setVolume(newVolume);
    audio.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
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
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      )}
      <audio
        ref={audioRef}
        controls
        crossorigin="anonymous"
        style={{ display: 'none' }}
      >
        <source src="https://d4cbg8stml4t6.cloudfront.net/stream" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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