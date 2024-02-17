import React, { memo } from 'react';
import { useRoutes , Navigate , NavLink  } from 'react-router-dom';
import routes from './router';

import './App.css';
import './css/AppMenu.css';

const App = memo(() => {
  return (
    <div className='app'>
    <div className='topHeader'>
      <div className='topDog'></div>
    </div>
    <div className='leftMenu'>
      <NavLink to="/home" className="navMenu">home</NavLink> 
      <NavLink to="/websocket" className="navMenu">websocket1.0</NavLink>
      <NavLink to="/rabbitmq" className="navMenu">rabbitmq0.1</NavLink>
      <NavLink to="/redis" className="navMenu">redis0</NavLink>
    </div>
    <div className='rightMain'>
      { useRoutes(routes) }
    </div>
</div>
  )
})


export default App;