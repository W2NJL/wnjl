import Dashboard from './../pages/admin/Dashboard';
import SettingIndex from './../pages/admin/settings/SettingIndex';
import SettingGeneral from './../pages/admin/settings/SettingGeneral';
import SettingSite from './../pages/admin/settings/SettingSite';
import SettingTheme from './../pages/admin/settings/SettingTheme';
import UserDetails from './../pages/admin/UserDetails.jsx'
import React from 'react';


export const adminRoutes = [
    {
  
      path: '/admin',
      children:[
        {
          path: 'dashboard', element: React.createElement(Dashboard)
        },
        {
          path: 'manage', element: React.createElement(Dashboard)
        },
        {
          path: 'manage/user/:userId', element: React.createElement(UserDetails),
          shouldRevalidate(args){
  console.log({args});
  return true; 
          },
          loader({params, request}){
            console.log('bad boy');
            //fetch user
            //return result
            //return fetch('/api/users' + params.userId);
  return json({
    hey: 'Bah-De-Ya'
  })
  
          },
          async action({params, request}){
            console.log('action jackson')
            const formData = await request.formData();
            console.log('naked ', Object.fromEntries(formData));
            return {
              errors: 'The email is fucked'
            }
          }
        },
        {
          path: 'settings', element: React.createElement(SettingIndex),
          children:[
            {
              path: 'general', element: React.createElement(SettingGeneral)
            },
            {
              path: 'site', element: React.createElement(SettingSite)
            },
            {
              path: 'theme', element: React.createElement(SettingTheme)
            },
          ]
        },
  
      ]
    }
  ];