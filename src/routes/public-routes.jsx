// src/routes/public-routes.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from './../pages/Home';
import About from './../pages/About';
import Error from '../pages/Error';
import Timer from '../pages/Timer';
import Start from '../pages/timer/Start';
import PublicLayout from '../layouts/public/PublicLayout';
import Schedule from '../schedule/Schedule';

const WrappedPublicLayout = () => (
  <PublicLayout>
    <Outlet />
  </PublicLayout>
);

export const publicRoutes = [
  {
    path: '/',
    element: <WrappedPublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'timer', element: <Timer /> },
      { path: 'start', element: <Start /> },
      { path: 'schedule', element: <Schedule /> },
    ],
    errorElement: <Error />,
  },
];