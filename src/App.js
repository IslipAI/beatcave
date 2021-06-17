import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import useToken from './components/Hooks/UseToken.js';

import './App.css';
import Home from './components/Home/Home.js';
import Beats from './components/Beats/Beats.js';
import Events from './components/Events/Events.js';
import About from './components/About/About.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

import Navbar from './components/Navbar/Navbar.js';


function App() {
  const {token, setToken} = useToken();

  if(!token){
    return(
      <Login setToken={setToken}/>
    )
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/beats">
            <Beats/>
          </Route>
          <Route path="/events">
            <Events/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
