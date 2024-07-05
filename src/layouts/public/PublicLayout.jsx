// src/layouts/public/PublicLayout.jsx

import React from 'react';
import Navbar from './navbar/Navbar';
import Player from '../../components/player/Player';

export default function PublicLayout(props) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      {/* Player */}
      <Player />
      
      {/* Body */}
      {props.children}

      {/* Footer */}
    </div>
  );
}