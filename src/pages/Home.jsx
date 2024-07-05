// src/pages/Home.jsx

import React, { useState } from 'react';
import css from './Home.module.scss';
import Last20Played from '../components/now-playing/NowPlaying';
import { useGlobalContext, ACTIONS } from '../store/GlobalStore';

export default function Home(props) {
  const globalStore = useGlobalContext();

  function onClick() {
    globalStore.dispatch({
      type: ACTIONS.UPDATE_HEY,
      payload: 'patriot way'
    });
  }

  const [checked, setChecked] = useState(true);

  return (
    <div>
      {/* Content specific to Home page */}
      <Last20Played />
    </div>
  );
}