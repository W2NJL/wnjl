import React from 'react'
import Navbar from './navbar/Navbar'
import { useLocation } from 'react-router'

export default function PublicLayout(props) {

    const location = useLocation();

    console.log(location);
  return (
    <div>
        {/*navbar*/}
        <Navbar/>
      
        {/*body*/}
        {props.children}

        {/*footer*/}
    </div>
  )
}
