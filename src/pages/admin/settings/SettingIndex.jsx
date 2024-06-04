import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export default function SettingIndex() {
  return (
    <div>
      All Settings

      <ul>
        <li><Link to ="/admin/settings/general">General Hospital</Link></li>
        <li><Link to ="/admin/settings/theme">Theme</Link></li>
        <li><Link to ="/admin/settings/site">Site B</Link></li>
      </ul>
      <div>
        <h1>Heres your content</h1>
        <Outlet/>
    </div>
    </div>

 
  )
}
