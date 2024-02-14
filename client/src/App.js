import React, { memo } from 'react';
import { useRoutes , Navigate , NavLink } from 'react-router-dom';
import routes from './router';

import './App.css';
import './AppMenu.css';

const App = memo(() => {
  return (
    <div className='app'>
    <div className='topHeader'>header</div>
    <div className='leftMenu'>
      <NavLink to="/home" className="navMenu">home</NavLink> 
      <NavLink to="/websocket" className="navMenu">websocket</NavLink>
      <NavLink to="/rabbitmq" className="navMenu">rabbitmq</NavLink>
    </div>
    <div className='rightMain'>
      { useRoutes(routes) }
    </div>
</div>
  )
})


export default App;