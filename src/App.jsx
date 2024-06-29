import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './layouts/public/navbar/Navbar';
import RickRoll from './containers/RickRoll';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';


function App() {

  const routes = useRoutes([


])

  //let abc = "123"; 
  const [abc, setAbc] = useState("123");

  // setTimeout(() => {
  //   // console.log('settimeout');
  //   // abc = "456";
  //   setAbc("456");
  // }, 2000);

  function changeAbc(){
    setAbc('aaaaa');
  }

  function sayHello(){
console.log('Outkast');
  }

  const paragraph = <p>{abc}</p>

  return (
   
      <div>
       
        {routes}
{/*<Routes>

 <Route path="/" element={<Home/>} />
<Route path="contact" element={<Contact/>} />
<Route path="/admin">
  <Route path="dashboard" element={<Dashboard/>} />
  <Route path="settings" element={<Dashboard/>} />
  <Route path="manage/user/:userId" element={<Dashboard/>} />
  <Route path="manage" element={<Dashboard/>} />
</Route>


</Routes> */}

       
      </div>

  )
}

export default App
