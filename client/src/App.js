import React, { memo } from 'react';
//import { useRoutes  , NavLink  } from 'react-router-dom';
import { useRoutes  } from 'react-router-dom';
import routes from './router';

import './App.css';
import './css/AppMenu.css';

const App = memo(() => {
  return (
    <div className='app'>
    
{/*       <div className='topHeader'>
        <NavLink to="/home" className="topMenu">Pasay</NavLink> 
      </div>
      <div className='leftMenu'>
        <NavLink to="/home" className="navMenu">home</NavLink> 
        <NavLink to="/websockets" className="navMenu">websockets</NavLink>
        <NavLink to="/rabbitmq" className="navMenu">rabbitmq</NavLink>
        <NavLink to="/rediscache" className="navMenu">rediscache</NavLink>
      </div>
      <div className='rightMain'>
        { useRoutes(routes) }
      </div>  */}
    
      <div className='footBody'>
        { useRoutes(routes) }
      </div>
  </div>
  )
})


export default App;