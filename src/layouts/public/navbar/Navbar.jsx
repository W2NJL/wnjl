import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from "./Navbar.module.css";
import logo from '../../../assets/wnjl.png'; // Adjust the path according to the Navbar.jsx location

export default function Navbar() {
    const navItems = [
        {
            title: 'Home',
            to: '/'
        },
        {
            title: 'Schedule',
            to: '/schedule'
        },
        {
            title: 'About',
            to: '/about'
        },
        { title: 'Lancaster Ave. Oasis', to: '/oasis' },
    ];

    function renderNavItems() {
        return navItems.map((navItem) => (
            <li key={navItem.title}>
                <Link to={navItem.to}>{navItem.title}</Link>
            </li>
        ));
    }

    

    return (
        <nav className={css.nav}>
            <img src={logo} alt="WNJL Logo" className={css.logo} />
            <button>WNJL.com Radio</button>
            <ul>
                {renderNavItems()}
            </ul>
        </nav>
    );
}