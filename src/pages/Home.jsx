import React, { useContext, useState } from 'react'
import PublicLayout from '../layouts/public/PublicLayout'
import { useNavigate } from 'react-router'
import css from './Home.module.scss';

import { ACTIONS, GlobalContext, useGlobalContext } from '../store/GlobalStore';
import Player from '../components/player/Player';
import Last20Played from '../components/now-playing/NowPlaying';


export default function Home(props) {

    console.log({css});

    const globalStore = useGlobalContext();

    console.log({globalStore});

    const navigate = useNavigate();


    function onClick(){

        globalStore.dispatch({
            type: ACTIONS.UPDATE_HEY,
            payload: 'patriot way'
        });

        console.log(globalStore.state);

        // navigate(
        //     '/contact',{
        //         state:{
        //             heyya: 'outkast',
        //         }
        //     }
        // )


    }


    const [checked, setChecked ]= useState(true);
  return (
  <PublicLayout>

<Player></Player>
<Last20Played /> {/* Include the Last 20 Played component */}


  </PublicLayout>
  )
}
