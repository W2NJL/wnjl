import React, { useState } from 'react'
import Button from '../components/Button'

export default function RickRoll() {

    const [rickRolls, setRickRolls] = useState([]);

function rick(event){
    const url = 'https://c.tenor.com/x8v1oNUOmg4AAAAd/tenor.gif';
    setRickRolls(
        [
          ...rickRolls,url,  
        ]
    );
    //generate new rick
}

  return (
    <div>
      <Button onClick={rick}>Rickroll</Button>
      <section>

        {rickRolls.map(url =>(
            <img src={url} alt='you just got rick rolled'/>
        ))}
      </section>
    </div>
  )
}
