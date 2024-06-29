import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'virtual:windi.css'
import { BrowserRouter, RouterProvider, createBrowserRouter, createHashRouter, json } from 'react-router-dom'
import { publicRoutes } from './routes/public-routes.js'
import { adminRoutes } from './routes/admin-routes.js'
import { GlobalContext, GlobalProvider } from './store/GlobalStore.jsx'






const router = createHashRouter([
  ...publicRoutes,
  ...adminRoutes,

])



ReactDOM.createRoot(document.getElementById('root')).render(
 //// <React.StrictMode>
    <GlobalProvider>
    <RouterProvider router={router}/>
    </GlobalProvider>
 
   
  
   
 // </React.StrictMode>,
)
