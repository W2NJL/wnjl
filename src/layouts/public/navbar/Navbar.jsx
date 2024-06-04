import React, { useEffect, useState } from 'react';
import css from "./Navbar.module.css";
import { Link } from 'react-router-dom';

export default function Navbar() {

const navItems =[
    
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Contact',
        to: '/contact'
    },
    {
        title: 'Admin',
        to: '/admin/dashboard'
    },
   
    
]

function renderNavItems(){
    return navItems.map((navItem) => (
        <li key={navItem.title}>
            <Link to={navItem.to}>{navItem.title}</Link>
        </li>
    ))}

  

    const [counterA, setCounterA] = useState(0);
    const [counterB, setCounterB] = useState(0);

    useEffect(() =>{
        //logic
        console.log(' Quincy')
    })

    useEffect(() =>{
        //logic
        console.log('Just Once Quincy')
    }, [])

    useEffect(() =>{
        //logic
        console.log('Counter A')
    }, [counterA])

    function onClick(){
        setCounterA(counterA+1);
    }

  return (
   <nav className={css.nav}>
    <button onClick={onClick}>Shit</button>
    <ul>
    {renderNavItems()}
    </ul>
   </nav>
  )
}
