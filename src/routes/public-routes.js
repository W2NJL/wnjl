import Home from './../pages/Home';
import Contact from './../pages/Contact';
import React from 'react';
import Error from '../pages/Error';

export const publicRoutes = [
    {  
      path: '/',
      element: React.createElement(Home),
      errorElement: React.createElement(Error),
    },
    {  
      path: '/contact',
      element: React.createElement(Contact)
    },
  ];